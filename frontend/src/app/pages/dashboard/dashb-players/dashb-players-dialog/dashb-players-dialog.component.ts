import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { IApiCountry } from '@models/countries.models';
import { IApiPlayer } from '@models/player.model';
import { IApiTeam } from '@models/teams.model';
import { ApiRequestService } from '@services/api-request.service';
import { CountriesService } from '@services/api-requests/countries.service';
import { PlayersService } from '@services/api-requests/players.service';
import { TeamsService } from '@services/api-requests/teams.service';

@Component({
  selector: 'app-dashb-players-dialog',
  templateUrl: './dashb-players-dialog.component.html',
  styleUrls: ['./dashb-players-dialog.component.scss'],
})
export class DashbPlayersDialogComponent implements OnInit {
  form: FormGroup;
  countries: IApiCountry[];
  teams: IApiTeam[];

  editedItem: IApiPlayer;

  constructor(
    private playersService: PlayersService,
    private countriesService: CountriesService,
    private teamsService: TeamsService,
    private messageService: MessageService,
    private apiRequestService: ApiRequestService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.form = new FormGroup({
      nickname: new FormControl(null, Validators.required),
      country: new FormControl(null),
      team: new FormControl(null),
    });

    this.editedItem = this.config?.data?.player;
  }

  ngOnInit(): void {
    this.countriesService.getAll().subscribe((data) => (this.countries = data));
    this.teamsService.getAll().subscribe((data) => (this.teams = data));
    this.form.patchValue(this.editedItem);
  }

  onSubmit(): void {
    if (this.editedItem) {
      this.playersService.put(this.editedItem.id, this.form.value).subscribe({
        next: () => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Player updated',
            detail: 'Player has been successfully updated',
          });
          this.ref.close(true);
        },
        error: (response) => {
          this.apiRequestService.catchError(response, 'Wrong data');
          this.ref.close();
        },
      });
      return;
    }
    this.playersService.post(this.form.value).subscribe({
      next: () => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Player added',
          detail: 'Player has been successfully added',
        });
        this.ref.close(true);
      },
      error: (response) => {
        this.apiRequestService.catchError(response, 'Wrong data');
        this.ref.close();
      },
    });
  }

  onClose(emitUpdate = false): void {
    this.ref.close(emitUpdate);
  }
}
