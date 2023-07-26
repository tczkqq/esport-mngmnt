import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IApiPost } from '@models/posts.model';
import { ApiRequestService } from '@services/api-request.service';
import { PostsService } from '@services/api-requests/posts.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dash-posts-add',
  templateUrl: './dash-posts-add.component.html',
  styleUrls: ['./dash-posts-add.component.scss'],
})
export class DashPostsAddComponent implements OnInit {
  form: FormGroup;
  editedItem: IApiPost;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private apiRequestService: ApiRequestService,
    private router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      active: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (!isNaN(param['postId'])) {
        this.getEditedItem(parseInt(param['postId']));
      }
    });
  }

  onSubmit(): void {
    if (this.editedItem) {
      this.postsService.put(this.editedItem.id, this.form.value).subscribe({
        next: () => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Post updated',
            detail: 'Post has been successfully updated',
          });
          this.router.navigate(['dashboard', 'posts']);
        },
        error: (response) => {
          this.apiRequestService.catchError(response, 'Wrong data');
        },
      });
      return;
    }
    this.postsService.post(this.form.value).subscribe({
      next: () => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Post added',
          detail: 'Post has been successfully added',
        });
        this.router.navigate(['dashboard', 'posts']);
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
    this.postsService.getDetails(id).subscribe((post) => {
      this.editedItem = post;
      this.form.patchValue(post);
    });
  }
}
