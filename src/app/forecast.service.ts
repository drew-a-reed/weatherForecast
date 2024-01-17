import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {}

  getWeatherForcast(): Observable<any> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
        },
        (error) => {
          observer.next(error);
        }
      );
    }).pipe(
      map((value: any) => {
        return new HttpParams()
          .set('lon', value.coords.longitude)
          .set('lat', value.coords.latitude)
          .set('units', 'imperial')
          .set('appid', 'd3aae32fea1193504888da921fe7538b');
      }),
      switchMap((values) => {
        return this.http.get(
          'https://api.openweathermap.org/data/2.5/forecast',
          { params: values }
        );
      })
    );
  }

  getWeatherByZip(zip: any): Observable<any> {
    return new Observable((observer) => {
      observer.next(zip);
    }).pipe(
      map((zipCode: any) => {
        return new HttpParams()
          .set('zip', zipCode + ',us')
          .set('appid', 'd3aae32fea1193504888da921fe7538b')
          .set('units', 'imperial');
      }),
      switchMap((values) => {
        return this.http.get(
          'https://api.openweathermap.org/data/2.5/forecast',
          { params: values }
        );
      })
    );
  }
}
