import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';

import { Subscription } from 'rxjs';

import { ConfigService } from '@services/config.service';
import { AuthService } from '@services/auth.service';
import { Roles } from '@constants/roles.constants';
import { SettingsService } from '@services/api-requests/settings.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  subscription: Subscription;

  items: MenuItem[];
  siteTitle: string = this.configService.siteTitle;

  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private router: Router,
    private messageService: MessageService,
    private settingService: SettingsService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = !!this.authService.user;
    this.setupMenu();
    this.authService.authChanged.subscribe(() => {
      this.isAuthenticated = !!this.authService.user;
      this.setupMenu();
    });

    this.settingService.getAll().subscribe((data) => {
      data.forEach((setting) => {
        if (setting.key == 'navTitle') {
          this.siteTitle = setting.value;
          this.configService.siteTitle = setting.value;
          this.setupMenu();
        }
      });
    });
  }

  setupMenu(): void {
    this.items = [
      { label: this.siteTitle, icon: PrimeIcons.HOME, routerLink: ['/home'] },
      {
        label: 'Events',
        icon: PrimeIcons.PLAY,
        routerLink: ['/events'],
      },
      {
        label: 'My Calendar',
        icon: PrimeIcons.CALENDAR,
        visible:
          this.isAuthenticated && this.authService.hasPermission(Roles.User),
        routerLink: ['/myCalendar'],
      },
      {
        label: 'Team',
        icon: PrimeIcons.USERS,
        visible:
          this.isAuthenticated && this.authService.hasPermission(Roles.User),
        routerLink: ['/team'],
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-wrench',
        visible:
          this.isAuthenticated && this.authService.hasPermission(Roles.Admin),
        routerLink: ['/dashboard', 'posts'],
      },
      {
        icon: PrimeIcons.SIGN_OUT,
        label: 'Account',
        visible: this.isAuthenticated,
        items: [
          {
            label: 'Profile',
            icon: PrimeIcons.USER,
            routerLink: ['/profile'],
          },
          {
            label: 'Logout',
            icon: PrimeIcons.SIGN_OUT,
            command: () => {
              this.authService.logout().subscribe(() => {
                this.authService.deleteToken();
                this.router.navigateByUrl('/home');
                this.messageService.add({
                  key: 'main',
                  severity: 'success',
                  summary: 'Logged out',
                  detail: 'Redirecting to homepage',
                });
              });
            },
          },
        ],
      },
      {
        label: 'Login',
        icon: PrimeIcons.SIGN_IN,
        routerLink: ['/login'],
        visible: !this.isAuthenticated,
      },
      {
        label: 'Register',
        icon: PrimeIcons.USER_PLUS,
        routerLink: ['/register'],
        visible: !this.isAuthenticated,
      },
    ];
  }
}
