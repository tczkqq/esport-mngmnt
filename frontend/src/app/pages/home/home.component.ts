import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { IApiEvent } from '@models/events.models';
import { EventsService } from '@services/api-requests/events.service';
import { PostsService } from '@services/api-requests/posts.service';
import { IApiPost } from '@models/posts.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  events: IApiEvent[];
  posts: IApiPost[];

  constructor(
    private eventsService: EventsService,
    private postsService: PostsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  trackByIndex(index: number): number {
    return index;
  }

  refreshData(): void {
    this.eventsService.getAll().subscribe((data) => {
      this.events = data;
    });

    this.postsService.getActivePosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
