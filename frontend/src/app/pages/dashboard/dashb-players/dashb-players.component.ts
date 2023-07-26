import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { DashbPlayersDialogComponent } from './dashb-players-dialog/dashb-players-dialog.component';
import { PlayersService } from '@services/api-requests/players.service';
import { IApiPlayer } from '@models/player.model';

@Component({
  selector: 'app-dashb-players',
  templateUrl: './dashb-players.component.html',
  styleUrls: ['./dashb-players.component.scss'],
})
export class DashbPlayersComponent implements OnInit {
  players: IApiPlayer[];

  constructor(
    private playersService: PlayersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.playersService.getAll().subscribe((data) => {
      this.players = data;
    });
  }

  onEdit(player: IApiPlayer): void {
    const dialogRef = this.dialogService.open(DashbPlayersDialogComponent, {
      header: 'Edit Player',
      data: { player: player },
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }
}
