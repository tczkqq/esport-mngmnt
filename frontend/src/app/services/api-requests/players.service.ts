import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiPlayer } from '@models/player.model';
import { ConfigService } from '@services/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  api = this.configService.api + this.configService.endpoints.players;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<IApiPlayer[]> {
    return this.http.get<IApiPlayer[]>(this.api);
  }

  getDetails(id: number): Observable<IApiPlayer> {
    return this.http.get<IApiPlayer>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiPlayer): Observable<IApiPlayer> {
    return this.http.put<IApiPlayer>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiPlayer): Observable<IApiPlayer> {
    return this.http.post<IApiPlayer>(this.api, data);
  }
}
