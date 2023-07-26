import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { DashbCountriesDialogComponent } from './dashb-countries-dialog/dashb-countries-dialog.component';
import { CountriesService } from '@services/api-requests/countries.service';
import { IApiCountry } from '@models/countries.models';

@Component({
  selector: 'app-dashb-countries',
  templateUrl: './dashb-countries.component.html',
  styleUrls: ['./dashb-countries.component.scss'],
})
export class DashbCountriesComponent implements OnInit {
  countries: IApiCountry[];
  item: IApiCountry;

  constructor(
    private countriesService: CountriesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.countriesService.getAll().subscribe((data) => {
      this.countries = data;
    });
  }

  onAdd(): void {
    const dialogRef = this.dialogService.open(DashbCountriesDialogComponent, {
      header: 'Add Country',
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }

  onEdit(country: IApiCountry): void {
    const dialogRef = this.dialogService.open(DashbCountriesDialogComponent, {
      header: 'Edit Country',
      data: { country: country },
    });

    dialogRef.onClose.subscribe((needUpdate: boolean) => {
      if (needUpdate) {
        this.refreshData();
      }
    });
  }

  onDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.countriesService.delete(id).subscribe(() => {
          this.messageService.add({
            key: 'main',
            severity: 'success',
            summary: 'Country deleted',
            detail: 'Contry has been successfully deleted',
          });
          this.refreshData();
        });
      },
    });
  }
}
