import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { IApiEvent } from '@models/events.models';
import { EventsService } from '@services/api-requests/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: IApiEvent[];

  constructor(
    private eventsService: EventsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.eventsService.getAll().subscribe((data) => {
      this.events = data;
    });
  }

  onDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.eventsService.delete(id).subscribe(() => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Game deleted',
            detail: 'Game has been successfully deleted',
          });
        });
        this.refreshData();
      },
    });
  }
}
