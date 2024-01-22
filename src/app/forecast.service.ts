import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {}

  getLatLong(): Observable<{ lat: number, lon: number }> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
        },
        (error) => {
          observer.error(error);
        }
      );
    }).pipe(
      map((coords: any) => {
        return { lat: coords.latitude, lon: coords.longitude };
      }),
      catchError((error) => {
        console.error('Error getting location:', error);
        throw error;
      })
    );
  }

  getWeatherForcast(): Observable<{ coords: { lat: number, lon: number }, forecast: any }> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({ coords: position.coords });
        },
        (error) => {
          observer.next({ error });
        }
      );
    }).pipe(
      switchMap((values: any) => {
        const params = new HttpParams()
          .set('lon', values.coords.longitude)
          .set('lat', values.coords.latitude)
          .set('units', 'imperial')
          .set('appid', 'd3aae32fea1193504888da921fe7538b');

        return this.http.get(
          'https://api.openweathermap.org/data/2.5/forecast',
          { params: params }
        ).pipe(
          map((forecast) => ({ coords: values.coords, forecast }))
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

  getWeatherMap(layer: string, z: string, x: string, y: string): Observable<any> {
    return new Observable((observer) => {
      observer.next();
    }).pipe(
      switchMap(() => {
        const params = new HttpParams()
          .set('layer', layer)
          .set('z', z)
          .set('x', x)
          .set('y', y)
          .set('appid', 'd3aae32fea1193504888da921fe7538b');

        return this.http.get(
          `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png`,
          { params: params, responseType: 'blob' }
        );
      })
    );
  }
}
