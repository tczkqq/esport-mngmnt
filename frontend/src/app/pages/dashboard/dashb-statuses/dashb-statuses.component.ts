import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { DashbStatusesDialogComponent } from './dashb-statuses-dialog/dashb-statuses-dialog.component';
import { StatusesService } from '@services/api-requests/statuses.service';
import { IApiStatus } from '@models/status.model';

@Component({
  selector: 'app-dashb-statuses',
  templateUrl: './dashb-statuses.component.html',
  styleUrls: ['./dashb-statuses.component.scss'],
})
export class DashbStatusesComponent implements OnInit {
  statuses: IApiStatus[];

  constructor(
    private statusesService: StatusesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.statusesService.getAll().subscribe((data) => {
      this.statuses = data;
    });
  }

  onAdd(): void {
    const dialogRef = this.dialogService.open(DashbStatusesDialogComponent, {
      header: 'Add Status',
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }

  onEdit(status: IApiStatus): void {
    const dialogRef = this.dialogService.open(DashbStatusesDialogComponent, {
      header: 'Edit Status',
      data: { status: status },
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }

  onDelete(status: IApiStatus): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete '${status.name}'?`,
      accept: () => {
        this.statusesService.delete(status.id).subscribe(() => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Game deleted',
            detail: 'Game has been successfully deleted',
          });
          this.refreshData();
        });
      },
    });
  }
}
