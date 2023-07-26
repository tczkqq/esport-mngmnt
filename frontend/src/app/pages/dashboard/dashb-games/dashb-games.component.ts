import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { DashbGamesDialogComponent } from './dashb-games-dialog/dashb-games-dialog.component';
import { IApiGame } from '@models/games.model';
import { GamesService } from '@services/api-requests/games.service';

@Component({
  selector: 'app-dashb-games',
  templateUrl: './dashb-games.component.html',
  styleUrls: ['./dashb-games.component.scss'],
})
export class DashbGamesComponent implements OnInit {
  games: IApiGame[];

  constructor(
    private gamesService: GamesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.gamesService.getAll().subscribe((data) => {
      this.games = data;
    });
  }

  onAdd(): void {
    const dialogRef = this.dialogService.open(DashbGamesDialogComponent, {
      header: 'Add Game',
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }

  onEdit(game: IApiGame): void {
    const dialogRef = this.dialogService.open(DashbGamesDialogComponent, {
      header: 'Edit Game',
      data: { game: game },
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }

  onDelete(game: IApiGame): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete '${game.name}'?`,
      accept: () => {
        this.gamesService.delete(game.id).subscribe(() => {
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
