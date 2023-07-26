import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '@services/api-requests/settings.service';
import { AuthService } from '@services/auth.service';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  requestSent = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private settingService: SettingsService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.authService.authChanged.subscribe(() => {
      this.requestSent = this.authService.wasInitialRequestSent;
    });

    this.settingService.getAll().subscribe((data) => {
      data.forEach((setting) => {
        if (setting.key == 'navTitle') {
          this.titleService.setTitle(setting.value);
        }
      });
    });
  }
}
