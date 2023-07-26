import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IUser } from '@models/auth.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements AfterViewInit {
  user: IUser | null;

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.user = this.authService.user;
    this.authService.authChanged.subscribe(() => {
      this.user = this.authService.user;
    });
  }
}
