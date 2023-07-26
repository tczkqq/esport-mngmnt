import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { IApiCountry } from '@models/countries.models';
import { IApiTeam } from '@models/teams.model';
import { CountriesService } from '@services/api-requests/countries.service';
import { ApiRequestService } from '@services/api-request.service';
import { TeamsService } from '@services/api-requests/teams.service';

@Component({
  selector: 'app-dasb-teams-dialog',
  templateUrl: './dasb-teams-dialog.component.html',
  styleUrls: ['./dasb-teams-dialog.component.scss'],
})
export class DasbTeamsDialogComponent implements OnInit {
  form: FormGroup;
  countries: IApiCountry[];

  editedItem: IApiTeam;

  constructor(
    private teamsService: TeamsService,
    private countriesService: CountriesService,
    private messageService: MessageService,
    private apiRequestService: ApiRequestService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      logo: new FormControl(null, Validators.required),
      players: new FormControl(null),
      country: new FormControl(null, Validators.required),
      secret_join_code: new FormControl(null),
    });

    this.editedItem = this.config?.data?.team;
  }

  ngOnInit(): void {
    this.countriesService.getAll().subscribe((data) => (this.countries = data));
    this.form.patchValue(this.editedItem);
  }

  onSubmit(): void {
    let formData;
    if (this.form?.get('logo')?.dirty) {
      formData = new FormData();
      for (const key in this.form.value) {
        if (!this.form.get(key)?.dirty && this.form.get(key)?.value === null)
          continue;

        if (key == 'date') {
          formData.append(key, this.form.value[key].toISOString());
        } else {
          formData.append(key, this.form.value[key]);
        }
      }
    } else {
      formData = { ...this.form.value };
      delete formData['logo'];
    }

    if (this.editedItem) {
      this.teamsService.put(this.editedItem.id, formData).subscribe({
        next: () => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Team updated',
            detail: 'Team has been successfully updated',
          });
          this.onClose();
        },
        error: (response) => {
          this.apiRequestService.catchError(response, 'Wrong data');
        },
      });
      return;
    }
    this.teamsService.post(formData).subscribe({
      next: () => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Team added',
          detail: 'Team has been successfully added',
        });
        this.onClose();
      },
      error: (response) => {
        this.apiRequestService.catchError(response, 'Wrong data');
      },
    });
  }

  onUpload(event: any): void {
    this.form.get('logo')?.markAsDirty();
    this.form.get('logo')?.setValue(event.currentFiles[0]);
  }

  onClose(emitUpdate = false): void {
    this.ref.close(emitUpdate);
  }
}
