import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiAnnouncement } from '@models/announcement.model';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementsService {
  api = this.configService.api + this.configService.endpoints.announcements;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(id = null): Observable<IApiAnnouncement[]> {
    let param = new HttpParams();
    if (id) {
      param = param.append('id', id);
    }
    return this.http.get<IApiAnnouncement[]>(this.api, { params: param });
  }

  getDetails(id: number): Observable<IApiAnnouncement> {
    return this.http.get<IApiAnnouncement>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiAnnouncement): Observable<IApiAnnouncement> {
    return this.http.put<IApiAnnouncement>(
      this.api + id.toString() + '/',
      data
    );
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiAnnouncement): Observable<IApiAnnouncement> {
    return this.http.post<IApiAnnouncement>(this.api, data);
  }
}
