import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from '@services/config.service';
import { IApiCountry } from '@models/countries.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  api = this.configService.api + this.configService.endpoints.countries;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<IApiCountry[]> {
    return this.http.get<IApiCountry[]>(this.api);
  }

  getDetails(id: number): Observable<IApiCountry> {
    return this.http.get<IApiCountry>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiCountry): Observable<IApiCountry> {
    return this.http.put<IApiCountry>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiCountry): Observable<IApiCountry> {
    return this.http.post<IApiCountry>(this.api, data);
  }
}
