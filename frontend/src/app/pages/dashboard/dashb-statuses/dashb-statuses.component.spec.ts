import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbStatusesComponent } from './dashb-statuses.component';

describe('DashbStatusesComponent', () => {
  let component: DashbStatusesComponent;
  let fixture: ComponentFixture<DashbStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbStatusesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
