import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiSetting } from '@models/settings.model';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  api = this.configService.api + this.configService.endpoints.settings;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<IApiSetting[]> {
    return this.http.get<IApiSetting[]>(this.api);
  }

  getDetails(id: number): Observable<IApiSetting> {
    return this.http.get<IApiSetting>(this.api + id.toString() + '/');
  }

  put(id: number, data: IApiSetting): Observable<IApiSetting> {
    return this.http.put<IApiSetting>(this.api + id.toString() + '/', data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(this.api + id.toString() + '/');
  }

  post(data: IApiSetting): Observable<IApiSetting> {
    return this.http.post<IApiSetting>(this.api, data);
  }
}
