import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiTeam } from '@models/teams.model';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  api = this.configService.api + this.configService.endpoints.teams;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(eventId = null): Observable<IApiTeam[]> {
    let param = new HttpParams();
    if (eventId) {
      param = param.append('events', eventId);
    }
    return this.http.get<IApiTeam[]>(this.api, { params: param });
  }

  getDetails(id: number): Observable<IApiTeam> {
    return this.http.get<IApiTeam>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiTeam): Observable<IApiTeam> {
    return this.http.put<IApiTeam>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiTeam): Observable<IApiTeam> {
    return this.http.post<IApiTeam>(this.api, data);
  }

  addTeamPlayer(data: IApiTeam): Observable<IApiTeam> {
    return this.http.post<IApiTeam>(
      this.configService.api + '/api/dashboard/teams/add-to-team/',
      data
    );
  }
}
