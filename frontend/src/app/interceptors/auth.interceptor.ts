import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthHeaders(request));
  }

  addAuthHeaders(request: HttpRequest<any>) {
    const headers: any = {
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    if (localStorage.getItem('token')) {
      headers.setHeaders.Authorization =
        'Token ' + localStorage.getItem('token');
    }

    return request.clone(headers);
  }
}
