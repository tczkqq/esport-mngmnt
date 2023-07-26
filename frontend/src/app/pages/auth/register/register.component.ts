import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { AuthService } from '@services/auth.service';
import { FormConstants } from '@constants/form.constants';
import { ApiRequestService } from '@services/api-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
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
      email: new FormControl(null, [Validators.required, Validators.email]),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
    });
  }

  onSubmit(): void {
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.authService
          .login({
            username: this.form.get('username')?.value,
            password: this.form.get('password')?.value,
          })
          .subscribe((data) => {
            localStorage.setItem('token', data.token);
            this.authService.wasInitialRequestSent = false;
            this.router.navigateByUrl('/home');
            this.messageService.add({
              key: 'main',
              severity: 'success',
              summary: 'Logged in',
              detail: 'Redirecting to homepage',
            });
          });
      },
      error: (data) => {
        this.apiRequestService.catchError(data, 'Wrong credentails');
        this.form.get('password')?.reset();
      },
    });
  }
}
