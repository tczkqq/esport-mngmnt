import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbCountriesComponent } from './dashb-countries.component';

describe('CountriesComponent', () => {
  let component: DashbCountriesComponent;
  let fixture: ComponentFixture<DashbCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashbCountriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashbCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
