import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IApiSetting } from '@models/settings.model';
import { ApiRequestService } from '@services/api-request.service';
import { SettingsService } from '@services/api-requests/settings.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dashb-settings-dialog',
  templateUrl: './dashb-settings-dialog.component.html',
  styleUrls: ['./dashb-settings-dialog.component.scss'],
})
export class DashbSettingsDialogComponent implements OnInit {
  form: FormGroup;

  editedItem: IApiSetting;

  constructor(
    private settingsService: SettingsService,
    private messageService: MessageService,
    private apiRequestService: ApiRequestService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.form = new FormGroup({
      key: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
    });

    this.editedItem = this.config?.data?.setting;
  }

  ngOnInit(): void {
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
      this.settingsService.put(this.editedItem.id, formData).subscribe({
        next: () => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Setting updated',
            detail: 'Setting has been successfully updated',
          });
          this.onClose();
        },
        error: (response) => {
          this.apiRequestService.catchError(response, 'Wrong data');
        },
      });
      return;
    }
    this.settingsService.post(formData).subscribe({
      next: () => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Setting added',
          detail: 'Setting has been successfully added',
        });
        this.onClose();
      },
      error: (response) => {
        this.apiRequestService.catchError(response, 'Wrong data');
      },
    });
  }

  onClose(emitUpdate = false): void {
    this.ref.close(emitUpdate);
  }
}
