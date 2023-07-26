import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';
import { TreeNode } from 'primeng/api';

import { IApiAnnouncement } from '@models/announcement.model';
import { IApiEvent } from '@models/events.models';
import { IApiTeam } from '@models/teams.model';
import { AnnouncementsService } from '@services/api-requests/announcements.service';
import { EventsService } from '@services/api-requests/events.service';
import { TeamsService } from '@services/api-requests/teams.service';
import { RoundsService } from '@services/api-requests/rounds.service';
import { MatchesService } from '@services/api-requests/matches.service';
import { BracketsService } from '@services/brackets.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  event: IApiEvent;
  teams: IApiTeam[];
  announcements: IApiAnnouncement[];
  joined: boolean;
  loading = true;
  data: TreeNode[];

  constructor(
    private eventsService: EventsService,
    private announcementsService: AnnouncementsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private teamsService: TeamsService,
    private roundsService: RoundsService,
    private matchesService: MatchesService,
    private bracketsService: BracketsService
  ) {
    this.data = this.data = [
      {
        label: 'TBA',
        children: [
          {
            label: 'Team B',
            children: [
              {
                label: 'Team A',
              },
              {
                label: 'Team B',
              },
            ],
          },
          {
            label: 'Team C',
            children: [
              {
                label: 'Team C',
              },
              {
                label: 'Team D',
              },
            ],
          },
        ],
      },
    ];
  }

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = param['eventId'];
      if (isNaN(id)) return;
      this.eventsService.getDetails(id).subscribe((event) => {
        this.event = event;
        this.loading = false;
      });

      this.announcementsService
        .getAll(id)
        .subscribe((data) => (this.announcements = data));

      this.checkIfAlreadyJoined(id);

      this.teamsService.getAll(id).subscribe((data) => (this.teams = data));
    });

    forkJoin({
      rounds: this.roundsService.getAll(),
      matches: this.matchesService.getAll(),
    }).subscribe((data) => {
      this.bracketsService.convertToTree(data.rounds, data.matches);
    });
  }

  checkIfAlreadyJoined(id: number) {
    this.eventsService
      .amIPart({ event_id: id })
      .subscribe((data) => (this.joined = data));
  }

  joinEvent(id: number) {
    this.eventsService.joinEvent({ event_id: id }).subscribe(() => {
      this.checkIfAlreadyJoined(id);
      this.messageService.add({
        key: 'main',
        severity: 'success',
        summary: 'Joined',
        detail: 'You joined this event!',
      });
    });
  }
}
