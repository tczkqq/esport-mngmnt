import { Component, OnInit } from '@angular/core';
import { Roles } from '@constants/roles.constants';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  items: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setupMenu();
    this.authService.authChanged.subscribe(() => {
      this.setupMenu();
    });
  }

  setupMenu(): void {
    this.items = [
      {
        label: 'Settings',
        icon: 'pi pi-wrench',
        visible: this.authService.hasPermission(Roles.Staff),
        routerLink: ['/dashboard/settings'],
      },
      {
        label: 'Posts',
        icon: 'pi pi-wrench',
        visible: this.authService.hasPermission(Roles.Staff),
        routerLink: ['/dashboard/posts'],
      },
      {
        label: 'Players',
        icon: 'pi pi-wrench',
        routerLink: ['/dashboard/players'],
        visible: this.authService.hasPermission(Roles.Staff),
      },
      {
        label: 'Teams',
        icon: 'pi pi-wrench',
        routerLink: ['/dashboard/teams'],
        visible: this.authService.hasPermission(Roles.Staff),
      },
      {
        label: 'Events',
        icon: 'pi pi-wrench',
        routerLink: ['/dashboard/events'],
        visible: this.authService.hasPermission(Roles.Staff),
      },
      {
        label: 'Announcements',
        icon: 'pi pi-wrench',
        routerLink: ['/dashboard/announcements'],
        visible: this.authService.hasPermission(Roles.Staff),
      },
      {
        label: 'Countries',
        icon: 'pi pi-wrench',
        visible: this.authService.hasPermission(Roles.Staff),
        routerLink: ['/dashboard/countries'],
      },
      {
        label: 'Games',
        icon: 'pi pi-wrench',
        visible: this.authService.hasPermission(Roles.Staff),
        routerLink: ['/dashboard/games'],
      },
      {
        label: 'Statuses',
        icon: 'pi pi-wrench',
        visible: this.authService.hasPermission(Roles.Staff),
        routerLink: ['/dashboard/statuses'],
      },
    ];
  }
}
