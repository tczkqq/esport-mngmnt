import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiEvent, IApiEventSHRT } from '@models/events.models';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  api = this.configService.api + this.configService.endpoints.events;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<IApiEvent[]> {
    return this.http.get<IApiEvent[]>(this.api);
  }

  getDetails(id: number): Observable<IApiEvent> {
    return this.http.get<IApiEvent>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiEvent): Observable<IApiEvent> {
    return this.http.put<IApiEvent>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiEvent): Observable<IApiEvent> {
    return this.http.post<IApiEvent>(this.api, data);
  }

  amIPart(data: IApiEventSHRT): Observable<boolean> {
    return this.http.post<boolean>(
      this.configService.api + '/api/dashboard/events/am-i-part/',
      data
    );
  }

  joinEvent(data: IApiEventSHRT): Observable<null> {
    return this.http.post<null>(
      this.configService.api + '/api/dashboard/events/join/',
      data
    );
  }
}
