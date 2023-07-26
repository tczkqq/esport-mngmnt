import { Component, OnInit } from '@angular/core';
import { IApiPost } from '@models/posts.model';
import { PostsService } from '@services/api-requests/posts.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashb-posts',
  templateUrl: './dashb-posts.component.html',
  styleUrls: ['./dashb-posts.component.scss'],
})
export class DashbPostsComponent implements OnInit {
  posts: IApiPost[];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private postsService: PostsService
  ) {}

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.postsService.getAll().subscribe((data) => {
      this.posts = data;
    });
  }

  onDelete(post: IApiPost): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete '${post.title}' ?`,
      accept: () => {
        this.postsService.delete(post.id).subscribe(() => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Post deleted',
            detail: 'Post has been successfully deleted',
          });
          this.refreshData();
        });
      },
    });
  }
}
