import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { IApiCountry } from '@models/countries.models';
import { CountriesService } from '@services/api-requests/countries.service';
import { ApiRequestService } from '@services/api-request.service';

@Component({
  selector: 'app-dashb-countries-dialog',
  templateUrl: './dashb-countries-dialog.component.html',
  styleUrls: ['./dashb-countries-dialog.component.scss'],
})
export class DashbCountriesDialogComponent implements OnInit {
  form: FormGroup;
  item: IApiCountry;

  constructor(
    private countriesService: CountriesService,
    private apiRequestService: ApiRequestService,
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
    this.item = this.config?.data?.country;
  }

  ngOnInit(): void {
    if (this.item) this.form.patchValue(this.item);
  }

  onSubmit(): void {
    let formData;
    if (this.form?.get('image')?.dirty) {
      formData = new FormData();
      formData.append('name', this.form?.get('name')?.value);
      formData.append('image', this.form?.get('image')?.value);
    } else {
      formData = { name: this.form?.get('name')?.value };
    }

    if (this.item) {
      this.countriesService.put(this.item.id, formData as any).subscribe({
        next: () => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Country updated',
            detail: 'Country has been successfully updated',
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
    this.countriesService.post(formData as any).subscribe({
      next: () => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Country added',
          detail: 'Country has been successfully added',
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

  onUpload(event: any): void {
    this.form.get('image')?.markAsDirty();
    this.form.get('image')?.setValue(event.currentFiles[0]);
  }
}
