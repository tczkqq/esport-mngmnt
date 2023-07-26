import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  constructor(private messageService: MessageService) {}

  catchError(data: HttpErrorResponse, summary: string, duration = 7000) {
    for (const error in data.error) {
      for (const msg in data.error[error]) {
        this.messageService.add({
          key: 'main',
          severity: 'error',
          summary: summary,
          detail: data.error[error][msg],
          life: duration,
        });
      }
    }
  }
}
