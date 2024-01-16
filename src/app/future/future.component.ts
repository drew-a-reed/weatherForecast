import { ForecastService } from './../forecast.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.scss'],
})
export class FutureComponent implements OnInit {
  weatherData: any = [];
  zipcode: string = '';

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    if (this.zipcode.trim() === '') {
      this.forecastService.getWeatherForcast().subscribe((filteredData) => {
        this.futureForecast(filteredData);
      });
    }
  }

  futureForecast(data: any) {
    this.weatherData = [];
    console.log(data.city.name);

    const forecastList = data.list || data;
    for (let i = 0; i < forecastList.length; i += 8) {
      this.weatherData.push(forecastList[i]);
    }
  }

  onSearch() {
    if (this.zipcode.trim() !== '') {
      this.forecastService.getWeatherByZip(this.zipcode).subscribe((data) => {
        this.futureForecast(data);
      });
    } else {
      // Handle the case when the zipcode is empty
    }
  }
}
