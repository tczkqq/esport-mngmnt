import { Component } from '@angular/core';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  logoPath = this.configService.logoPath;

  constructor(private configService: ConfigService) {}
}
