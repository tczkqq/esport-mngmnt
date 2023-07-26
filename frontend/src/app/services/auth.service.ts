import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { ConfigService } from '@services/config.service';
import { Roles } from '@constants/roles.constants';
import {
  IApiLogin,
  IApiRegister,
  IApiToken,
  IApiUser,
  IUser,
} from '@models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUser | null = null;
  wasInitialRequestSent = false;
  isAuthenticated = false;

  authChanged = new Subject();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  login(data: IApiLogin): Observable<IApiToken> {
    return this.http.post<IApiToken>(
      this.configService.api + this.configService.endpoints.login,
      data
    );
  }

  register(data: IApiRegister): Observable<IApiToken> {
    return this.http.post<IApiToken>(
      this.configService.api + this.configService.endpoints.register,
      data
    );
  }

  logout(): Observable<null> {
    return this.http.post<null>(
      this.configService.api + this.configService.endpoints.logout,
      null
    );
  }

  getUser(): Observable<IApiUser> {
    return this.http.get<IApiUser>(
      this.configService.api + this.configService.endpoints.user
    );
  }

  setUser(user: IApiUser, token: string) {
    const tmpRoles = [Roles.User];

    if (user.is_staff) tmpRoles.push(Roles.Staff);
    if (user.is_superuser) tmpRoles.push(Roles.Admin);

    this.wasInitialRequestSent = true;
    this.isAuthenticated = true;
    this.user = {
      ...user,
      roles: tmpRoles,
    };
    localStorage.setItem('token', token);
    this.authChanged.next(null);
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.user = null;
    this.isAuthenticated = false;
    this.authChanged.next(null);
  }

  hasPermissions(roles: number[]): boolean {
    if (roles.length === 1 && roles[0] === Roles.Visitor) return true;
    if (!this.user) return false;
    return roles.some((ai) => (this.user as IUser).roles.includes(ai));
  }

  hasPermission(role: number): boolean {
    return this.user?.roles.includes(role) ? true : false;
  }

  hasTeam(): boolean {
    return this.user?.user_obj?.team != null;
  }
}
