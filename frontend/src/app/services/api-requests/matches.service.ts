import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiMatch } from '@models/match.model';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  api = this.configService.api + this.configService.endpoints.matches;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<IApiMatch[]> {
    return this.http.get<IApiMatch[]>(this.api);
  }

  getDetails(id: number): Observable<IApiMatch> {
    return this.http.get<IApiMatch>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiMatch): Observable<IApiMatch> {
    return this.http.put<IApiMatch>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiMatch): Observable<IApiMatch> {
    return this.http.post<IApiMatch>(this.api, data);
  }
}
