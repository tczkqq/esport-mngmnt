import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { IApiAnnouncement } from '@models/announcement.model';
import { AnnouncementsService } from '@services/api-requests/announcements.service';
import { EventsService } from '@services/api-requests/events.service';
import { IApiEvent } from '@models/events.models';

@Component({
  selector: 'app-dashb-announcements',
  templateUrl: './dashb-announcements.component.html',
  styleUrls: ['./dashb-announcements.component.scss'],
})
export class DashbAnnouncementsComponent implements OnInit {
  announcements: IApiAnnouncement[];
  events: IApiEvent[];

  eventFilter: number;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private announcementsService: AnnouncementsService,
    private eventsService: EventsService
  ) {}

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit(): void {
    this.refreshData();
    this.eventsService.getAll().subscribe((data) => {
      this.events = data;
    });
  }

  refreshData(event: any = undefined): void {
    this.announcementsService.getAll(event?.value).subscribe((data) => {
      this.announcements = data;
    });
  }

  onDelete(ann: IApiAnnouncement): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete '${ann.title}' ?`,
      accept: () => {
        this.announcementsService.delete(ann.id).subscribe(() => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Announcement deleted',
            detail: 'Announcement has been successfully deleted',
          });
          this.refreshData();
        });
      },
    });
  }
}
