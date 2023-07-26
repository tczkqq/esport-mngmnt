import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from '@services/config.service';
import { IApiRound } from '@models/round.model';

@Injectable({
  providedIn: 'root',
})
export class RoundsService {
  api = this.configService.api + this.configService.endpoints.rounds;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<IApiRound[]> {
    return this.http.get<IApiRound[]>(this.api);
  }

  getDetails(id: number): Observable<IApiRound> {
    return this.http.get<IApiRound>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiRound): Observable<IApiRound> {
    return this.http.put<IApiRound>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiRound): Observable<IApiRound> {
    return this.http.post<IApiRound>(this.api, data);
  }
}
