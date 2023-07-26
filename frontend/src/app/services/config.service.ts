import { Injectable } from '@angular/core';

import { IConfigEndpoints } from '@models/config.model';
import ConfigJson from '@assets/config.json';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  siteTitle = 'Esports CRM';
  navTitle = 'Esports CRM';
  logoPath = '/assets/img/logo.png';
  faviconPath = '/assets/img/favicon.png';

  endpoints: IConfigEndpoints = ConfigJson.endpoints;
  api: string = ConfigJson.api;
}
