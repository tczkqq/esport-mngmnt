import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestService } from '@services/api-request.service';
import { TeamsService } from '@services/api-requests/teams.service';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-team-join',
  templateUrl: './team-join.component.html',
  styleUrls: ['./team-join.component.scss'],
})
export class TeamJoinComponent {
  form: FormGroup;

  constructor(
    private teamsService: TeamsService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private apiRequestService: ApiRequestService
  ) {
    this.form = new FormGroup({
      team_id: new FormControl('', Validators.required),
      secret_join_code: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    this.teamsService.addTeamPlayer(this.form.value).subscribe({
      next: () => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Team updated',
          detail: 'Joining to team has been successfull',
        });
        this.router.navigate(['/home']);
        this.authService.wasInitialRequestSent = false;
      },
      error: (response) => {
        this.apiRequestService.catchError(response, 'Wrong data');
      },
    });
  }
}
