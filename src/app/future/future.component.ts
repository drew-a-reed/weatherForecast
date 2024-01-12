import { ForecastService } from './../forecast.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.scss']
})
export class FutureComponent implements OnInit {
  weatherData: any = [];

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastService.getWeatherForcast().pipe(
      map((data: any) => data.list)
    )
    .subscribe((filteredData) => {
      this.futureForecase(filteredData);
    });
  }

  futureForecase(data: any) {
    for (let i = 0; i < data.length; i += 8) {
      this.weatherData.push(data[i]);
    }
    console.log(this.weatherData);
  }
}
