import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiGame } from '@models/games.model';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  api = this.configService.api + this.configService.endpoints.games;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<IApiGame[]> {
    return this.http.get<IApiGame[]>(this.api);
  }

  getDetails(id: number): Observable<IApiGame> {
    return this.http.get<IApiGame>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiGame): Observable<IApiGame> {
    return this.http.put<IApiGame>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiGame): Observable<IApiGame> {
    return this.http.post<IApiGame>(this.api, data);
  }
}
