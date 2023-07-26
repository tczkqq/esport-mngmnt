import { Component, OnInit } from '@angular/core';
import { IApiTeam } from '@models/teams.model';
import { TeamsService } from '@services/api-requests/teams.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  hasTeam = false;
  team: IApiTeam;

  constructor(
    private authService: AuthService,
    private teamsService: TeamsService
  ) {}

  ngOnInit(): void {
    this.hasTeam = this.authService.hasTeam();

    if (this.hasTeam) {
      this.teamsService
        .getDetails(this.authService.user?.user_obj?.team as number)
        .subscribe((data) => (this.team = data));
    }
  }
}
