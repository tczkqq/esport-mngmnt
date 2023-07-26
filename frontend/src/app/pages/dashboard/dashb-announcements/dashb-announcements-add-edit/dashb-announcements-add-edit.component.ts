import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { IApiAnnouncement } from '@models/announcement.model';
import { IApiEvent } from '@models/events.models';
import { ApiRequestService } from '@services/api-request.service';
import { AnnouncementsService } from '@services/api-requests/announcements.service';
import { EventsService } from '@services/api-requests/events.service';

@Component({
  selector: 'app-dashb-announcements-add-edit',
  templateUrl: './dashb-announcements-add-edit.component.html',
  styleUrls: ['./dashb-announcements-add-edit.component.scss'],
})
export class DashbAnnouncementsAddEditComponent implements OnInit {
  form: FormGroup;
  editedItem: IApiAnnouncement;
  events: IApiEvent[];

  constructor(
    private announcementsService: AnnouncementsService,
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private apiRequestService: ApiRequestService,
    private router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      event: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (!isNaN(param['annId'])) {
        this.getEditedItem(parseInt(param['annId']));
      }
    });
    this.eventsService.getAll().subscribe((data) => {
      this.events = data;
    });
  }

  onSubmit(): void {
    if (this.editedItem) {
      this.announcementsService
        .put(this.editedItem.id, this.form.value)
        .subscribe({
          next: () => {
            this.messageService.add({
              key: 'main',
              severity: 'success',
              summary: 'Announcement updated',
              detail: 'Announcement has been successfully updated',
            });
            this.router.navigate(['dashboard', 'announcements']);
          },
          error: (response) => {
            this.apiRequestService.catchError(response, 'Wrong data');
          },
        });
      return;
    }
    this.announcementsService.post(this.form.value).subscribe({
      next: () => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Announcement added',
          detail: 'Announcement has been successfully added',
        });
        this.router.navigate(['dashboard', 'announcements']);
      },
      error: (response) => {
        this.apiRequestService.catchError(response, 'Wrong data');
      },
    });
  }

  onReset(): void {
    if (this.editedItem) {
      this.form.patchValue(this.editedItem);
      return;
    }
    this.form.reset();
  }

  getEditedItem(id: number): void {
    this.announcementsService.getDetails(id).subscribe((ann) => {
      this.editedItem = ann;
      this.form.patchValue(ann);
    });
  }
}
