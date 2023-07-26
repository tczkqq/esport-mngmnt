import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';

import { IApiEvent } from '@models/events.models';
import { IApiGame } from '@models/games.model';
import { ApiRequestService } from '@services/api-request.service';
import { EventsService } from '@services/api-requests/events.service';
import { GamesService } from '@services/api-requests/games.service';
import { evenNumberValidator } from '@tools/validators/even-number.validator';
import { AnnouncementsService } from '@services/api-requests/announcements.service';
import { IApiAnnouncement } from '@models/announcement.model';

@Component({
  selector: 'app-dashb-events-add-edit',
  templateUrl: './dashb-events-add-edit.component.html',
  styleUrls: ['./dashb-events-add-edit.component.scss'],
})
export class DashbEventsAddEditComponent implements OnInit {
  form: FormGroup;
  editedItem: IApiEvent;
  games: IApiGame[];
  announcements: IApiAnnouncement[];

  today = new Date();

  constructor(
    private eventsService: EventsService,
    private gamesService: GamesService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private apiRequestService: ApiRequestService,
    private announcementsService: AnnouncementsService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      cover: new FormControl(''),
      game: new FormControl(null),
      remote: new FormControl(false),
      address: new FormControl(null),
      coordinates: new FormControl(null),
      description: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      max_participants: new FormControl(4, evenNumberValidator()),
      rules: new FormControl(null),
      prizes: new FormControl(null),
      contact: new FormControl(null),
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (!isNaN(param['eventId'])) {
        this.getEditedItem(parseInt(param['eventId']));
        this.announcementsService.getAll(param['eventId']).subscribe((data) => {
          this.announcements = data;
        });
      }
    });

    this.gamesService.getAll().subscribe((games) => (this.games = games));
  }

  onSubmit(): void {
    let formData;
    if (this.form?.get('cover')?.dirty) {
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
      delete formData['cover'];
    }

    if (this.editedItem) {
      this.eventsService.put(this.editedItem.id, formData).subscribe({
        next: () => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Event updated',
            detail: 'Event has been successfully updated',
          });
          this.router.navigate(['dashboard', 'events']);
        },
        error: (response) => {
          this.apiRequestService.catchError(response, 'Wrong data');
        },
      });
      return;
    }
    this.eventsService.post(formData).subscribe({
      next: () => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Event added',
          detail: 'Event has been successfully added',
        });
        this.router.navigate(['dashboard', 'events']);
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

  onUpload(event: any): void {
    this.form.get('cover')?.markAsDirty();
    this.form.get('cover')?.setValue(event.currentFiles[0]);
  }

  getEditedItem(id: number): void {
    this.eventsService.getDetails(id).subscribe((event) => {
      this.editedItem = event;
      this.form.patchValue(event);
      const currentDate = new Date(event.date as number);
      this.form.get('date')?.setValue(currentDate);
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
        });
      },
    });
  }
}
