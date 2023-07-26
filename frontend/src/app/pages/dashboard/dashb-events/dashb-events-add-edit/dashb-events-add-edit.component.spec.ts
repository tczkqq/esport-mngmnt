import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbEventsAddEditComponent } from './dashb-events-add-edit.component';

describe('DashbEventsAddEditComponent', () => {
  let component: DashbEventsAddEditComponent;
  let fixture: ComponentFixture<DashbEventsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbEventsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbEventsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
