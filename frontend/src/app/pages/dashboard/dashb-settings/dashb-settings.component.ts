import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { DashbSettingsDialogComponent } from './dashb-settings-dialog/dashb-settings-dialog.component';
import { SettingsService } from '@services/api-requests/settings.service';
import { IApiSetting } from '@models/settings.model';

@Component({
  selector: 'app-dashb-settings',
  templateUrl: './dashb-settings.component.html',
  styleUrls: ['./dashb-settings.component.scss'],
})
export class DashbSettingsComponent implements OnInit {
  settings: IApiSetting[];

  constructor(
    private settingsService: SettingsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.settingsService.getAll().subscribe((data) => {
      this.settings = data;
    });
  }

  onAdd(): void {
    const dialogRef = this.dialogService.open(DashbSettingsDialogComponent, {
      header: 'Add Setting',
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }

  onEdit(setting: IApiSetting): void {
    const dialogRef = this.dialogService.open(DashbSettingsDialogComponent, {
      header: 'Edit Setting',
      data: { setting: setting },
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }

  onDelete(setting: IApiSetting): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete '${setting.key}'?`,
      accept: () => {
        this.settingsService.delete(setting.id).subscribe(() => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Setting deleted',
            detail: 'Setting has been successfully deleted',
          });
          this.refreshData();
        });
      },
    });
  }
}
