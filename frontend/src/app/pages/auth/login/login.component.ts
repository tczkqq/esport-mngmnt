import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { FormConstants } from '@assets/constants/form.constants';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiRequestService } from '@services/api-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private apiRequestService: ApiRequestService
  ) {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(FormConstants.loginMaxLength),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit(): void {
    this.authService.login(this.form.value).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        this.authService.wasInitialRequestSent = false;
        this.router.navigateByUrl('/home');
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Logged in',
          detail: 'Redirecting to homepage',
        });
      },
      error: (data) => {
        this.apiRequestService.catchError(data, 'Wrong credentails');
        this.form.get('password')?.reset();
      },
    });
  }
}
