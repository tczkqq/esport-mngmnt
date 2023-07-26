import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashbCountriesDialogComponent } from './dashb-countries-dialog.component';

describe('CountriesDialogComponent', () => {
  let component: DashbCountriesDialogComponent;
  let fixture: ComponentFixture<DashbCountriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashbCountriesDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashbCountriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
