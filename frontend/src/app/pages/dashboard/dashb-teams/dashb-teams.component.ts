import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { DasbTeamsDialogComponent } from './dasb-teams-dialog/dasb-teams-dialog.component';
import { TeamsService } from '@services/api-requests/teams.service';
import { IApiTeam } from '@models/teams.model';

@Component({
  selector: 'app-dashb-teams',
  templateUrl: './dashb-teams.component.html',
  styleUrls: ['./dashb-teams.component.scss'],
})
export class DashbTeamsComponent implements OnInit {
  teams: IApiTeam[];

  constructor(
    private teamsService: TeamsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.teamsService.getAll().subscribe((data) => {
      this.teams = data;
    });
  }

  onAdd(): void {
    const dialogRef = this.dialogService.open(DasbTeamsDialogComponent, {
      header: 'Add Team',
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }

  onEdit(team: IApiTeam): void {
    const dialogRef = this.dialogService.open(DasbTeamsDialogComponent, {
      header: 'Edit Team',
      data: { team: team },
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }

  onDelete(team: IApiTeam): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete '${team.name}'?`,
      accept: () => {
        this.teamsService.delete(team.id).subscribe(() => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Team deleted',
            detail: 'Team has been successfully deleted',
          });
          this.refreshData();
        });
      },
    });
  }
}
