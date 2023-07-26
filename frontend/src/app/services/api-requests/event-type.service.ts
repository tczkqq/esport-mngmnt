import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiEventType } from '@models/event-type.model';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root',
})
export class EventTypeService {
  api = this.configService.api + this.configService.endpoints.eventTypes;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<IApiEventType[]> {
    return this.http.get<IApiEventType[]>(this.api);
  }

  getDetails(id: number): Observable<IApiEventType> {
    return this.http.get<IApiEventType>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiEventType): Observable<IApiEventType> {
    return this.http.put<IApiEventType>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiEventType): Observable<IApiEventType> {
    return this.http.post<IApiEventType>(this.api, data);
  }
}
