import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent {
  timeline: any[] = [];
  weatherNow: any;
  location: any;
  currentTime = new Date();
  zipcode: string = '';
  weatherData: any = [];
  sunrise: any;
  sunset: any;
  lat = 0;
  lng = 0;

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    if (this.zipcode.trim() === '') {
      this.forecastService.getWeatherForcast().subscribe((data) => {
        this.getTodayForecast(data.forecast);
        this.futureForecast(data.forecast);

        this.lat = data.coords.lat;
        this.lng = data.coords.lon;

      });
    }

    this.forecastService.getLatLong().subscribe(
      (coords) => {
        this.lat = coords.lat;
        this.lng = coords.lon;
      },
      (error) => console.error('Error getting location:', error)
    );

  }

  ngAfterViewInit() {
  }

  dateRange() {
    const start = new Date();
    start.setHours(start.getHours() + start.getTimezoneOffset() / 60);
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return { start, to };
  }

  getTodayForecast(today: any) {
    this.timeline = [];
    this.location = today.city;
    this.weatherNow = null;

    for (const forecast of today.list.slice(0, 8)) {
      this.timeline.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp,
        conditions: forecast.weather[0].main,
        icon: forecast.weather[0].icon,
      });

      const apiDate = new Date(forecast.dt_txt).getTime();

      if (
        this.dateRange().start.getTime() <= apiDate &&
        this.dateRange().to.getTime() >= apiDate
      ) {
        this.weatherNow = forecast;
      }
    }
  }

  futureForecast(data: any) {
    this.weatherData = [];
    const forecastList = data.list || data;
    for (let i = 0; i < forecastList.length; i += 8) {
      this.weatherData.push(forecastList[i]);
    }
  }

  onSearch() {
    if (this.zipcode.trim() !== '') {
      this.forecastService.getWeatherByZip(this.zipcode).subscribe((data) => {
        this.getTodayForecast(data);
        this.futureForecast(data);

        this.forecastService.getLocation(this.zipcode).subscribe(
          (locationData) => {
            const location = locationData.results[0]?.geometry?.location;
            if (location) {
              this.lat = location.lat;
              this.lng = location.lng;
            }
          },
          (error) => console.error('Error getting location:', error)
        );
      });
    } else {
      // Handle case where zip code is empty
    }
  }

  getFormattedTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

}
