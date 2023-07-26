import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { IApiGame } from '@models/games.model';
import { GamesService } from '@services/api-requests/games.service';
import { ApiRequestService } from '@services/api-request.service';

@Component({
  selector: 'app-dashb-games-dialog',
  templateUrl: './dashb-games-dialog.component.html',
  styleUrls: ['./dashb-games-dialog.component.scss'],
})
export class DashbGamesDialogComponent implements OnInit {
  form: FormGroup;
  item: IApiGame;

  constructor(
    private gamesService: GamesService,
    private apiRequestService: ApiRequestService,
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      logo: new FormControl(null, Validators.required),
    });
    this.item = config?.data?.game;
  }

  ngOnInit(): void {
    if (this.item) this.form.patchValue(this.item);
  }

  onSubmit(): void {
    let formData;
    if (this.form?.get('logo')?.dirty) {
      formData = new FormData();
      formData.append('name', this.form?.get('name')?.value);
      formData.append('logo', this.form?.get('logo')?.value);
    } else {
      formData = { name: this.form?.get('name')?.value };
    }

    if (this.item) {
      this.gamesService.put(this.item.id, formData as any).subscribe({
        next: () => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Game updated',
            detail: 'Game has been successfully updated',
          });
          this.ref.close(true);
        },
        error: (response) => {
          this.apiRequestService.catchError(response, 'Wrong data');
          this.ref.close();
        },
      });
      return;
    }
    this.gamesService.post(formData as any).subscribe({
      next: () => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Game added',
          detail: 'Game has been successfully added',
        });
        this.ref.close(true);
      },
      error: (response) => {
        this.apiRequestService.catchError(response, 'Wrong data');
        this.ref.close();
      },
    });
  }

  onClose(emitUpdate = false): void {
    this.ref.close(emitUpdate);
  }

  onUpload(event: any): void {
    this.form.get('logo')?.markAsDirty();
    this.form.get('logo')?.setValue(event.currentFiles[0]);
  }
}
