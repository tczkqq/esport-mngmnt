import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { CountriesService } from '@services/api-requests/countries.service';
import { TeamsService } from '@services/api-requests/teams.service';
import { ApiRequestService } from '@services/api-request.service';
import { IApiCountry } from '@models/countries.models';
import { AuthService } from '@services/auth.service';
import { IApiTeam } from '@models/teams.model';

@Component({
  selector: 'app-team-add-edit',
  templateUrl: './team-add-edit.component.html',
  styleUrls: ['./team-add-edit.component.scss'],
})
export class TeamAddEditComponent implements OnInit {
  form: FormGroup;
  countries: IApiCountry[];
  @Input() editedItem: IApiTeam;

  constructor(
    private teamsService: TeamsService,
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private apiRequestService: ApiRequestService,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      logo: new FormControl(null, Validators.required),
      players: new FormControl(null),
      country: new FormControl(null, Validators.required),
      secret_join_code: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.countriesService.getAll().subscribe((data) => (this.countries = data));
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
          this.router.navigate(['dashboard', 'team']);
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
        this.router.navigate(['dashboard', 'team']);
      },
      error: (response) => {
        this.apiRequestService.catchError(response, 'Wrong data');
      },
    });
  }

  onReset(): void {
    if (this.editedItem) {
      this.form.patchValue(this.editedItem);
      return;
    }
    this.form.reset();
  }

  onUpload(event: any): void {
    this.form.get('logo')?.markAsDirty();
    this.form.get('logo')?.setValue(event.currentFiles[0]);
  }
}
