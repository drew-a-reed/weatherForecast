import { Component } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent {
  timeline: any[] = [];
  weatherNow:any;
  location:any;
  currentTime = new Date();
  zipcode: string = '';

  constructor(private forecastService: ForecastService){}

  ngOnInit(): void {
    if (this.zipcode.trim() === '') {
      this.forecastService.getWeatherForcast().subscribe(data => {
        this.getTodayForecast(data);
      });
    }
  }

  dateRange(){
    const start = new Date();
    start.setHours(start.getHours()+(start.getTimezoneOffset() / 60));
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return { start, to }
  }

  getTodayForecast(today: any) {
    this.timeline = [];
    this.location = today.city;
    this.weatherNow = null;

    for (const forecast of today.list.slice(0, 8)) {
      this.timeline.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp,
        conditions: forecast.weather[0].main
      });

      const apiDate = new Date(forecast.dt_txt).getTime();

      if (this.dateRange().start.getTime() <= apiDate && this.dateRange().to.getTime() >= apiDate) {
        this.weatherNow = forecast;
      }
    }
  }

  onSearch() {
    if (this.zipcode.trim() !== '') {
      this.forecastService.getWeatherByZip(this.zipcode).subscribe(data => {
        this.getTodayForecast(data);
      });
    } else {
      // Handle the case when the zipcode is empty
    }
  }
}
