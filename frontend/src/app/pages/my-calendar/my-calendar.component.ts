import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { MatchesService } from '@services/api-requests/matches.service';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss'],
})
export class MyCalendarComponent implements OnInit {
  events: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events,
  };

  constructor(private matchesService: MatchesService) {}

  ngOnInit() {
    this.matchesService.getAll().subscribe((data) => {
      for (const match of data) {
        const date = new Date(match.date);
        const event = {
          title: `${match.team_one_obj.name} vs ${match.team_two_obj.name}`,
          date: date.toISOString().slice(0, 10),
        };
        this.events.push(event);
      }
      this.calendarOptions = {
        ...this.calendarOptions,
        ...{ events: this.events },
      };
    });
  }
}
