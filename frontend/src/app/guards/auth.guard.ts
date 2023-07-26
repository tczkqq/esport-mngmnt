import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');

    if (token && !this.authService.wasInitialRequestSent) {
      this.authService.getUser().subscribe({
        next: (data) => {
          this.authService.setUser(data, token as string);
        },
        error: () => {
          if (!this.checkPermissions(route)) this.noPermission();
          this.authService.deleteToken();
          this.authService.wasInitialRequestSent = true;
        },
      });
    } else {
      this.authService.wasInitialRequestSent = true;
      this.authService.authChanged.next(null);
      if (!this.checkPermissions(route)) this.noPermission();
    }

    return true;
  }

  checkPermissions(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data?.roles as Array<number>;
    return this.authService.hasPermissions(roles);
  }

  noPermission(): void {
    this.messageService.add({
      key: 'main',
      severity: 'error',
      summary: 'No permission',
      detail: 'You dont have permission to access this page',
    });
    this.router.navigateByUrl('/home');
  }
}
