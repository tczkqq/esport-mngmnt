import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { IApiStatus } from '@models/status.model';
import { StatusesService } from '@services/api-requests/statuses.service';
import { ApiRequestService } from '@services/api-request.service';

@Component({
  selector: 'app-dashb-statuses-dialog',
  templateUrl: './dashb-statuses-dialog.component.html',
  styleUrls: ['./dashb-statuses-dialog.component.scss'],
})
export class DashbStatusesDialogComponent implements OnInit {
  nameControl = new FormControl('', Validators.required);
  item: IApiStatus;

  constructor(
    private statusesService: StatusesService,
    private apiRequestService: ApiRequestService,
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.item = config?.data?.status;
  }

  ngOnInit(): void {
    if (this.item) this.nameControl.setValue(this.item.name);
  }

  onSubmit(): void {
    const data = { name: this.nameControl.value };
    if (this.item) {
      this.statusesService.put(this.item.id, data as IApiStatus).subscribe({
        next: () => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Status updated',
            detail: 'Status has been successfully updated',
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
    this.statusesService.post(data as IApiStatus).subscribe({
      next: () => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Status added',
          detail: 'Status has been successfully added',
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
