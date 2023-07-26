import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from '@services/config.service';
import { IApiStatus } from '@models/status.model';

@Injectable({
  providedIn: 'root',
})
export class StatusesService {
  api = this.configService.api + this.configService.endpoints.statuses;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<IApiStatus[]> {
    return this.http.get<IApiStatus[]>(this.api);
  }

  getDetails(id: number): Observable<IApiStatus> {
    return this.http.get<IApiStatus>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiStatus): Observable<IApiStatus> {
    return this.http.put<IApiStatus>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiStatus): Observable<IApiStatus> {
    return this.http.post<IApiStatus>(this.api, data);
  }
}
