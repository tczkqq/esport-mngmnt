import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbEventsComponent } from './dashb-events.component';

describe('DashbEventsComponent', () => {
  let component: DashbEventsComponent;
  let fixture: ComponentFixture<DashbEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
