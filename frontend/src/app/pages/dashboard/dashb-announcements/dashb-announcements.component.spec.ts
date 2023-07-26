import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbAnnouncementsComponent } from './dashb-announcements.component';

describe('DashbAnnouncementsComponent', () => {
  let component: DashbAnnouncementsComponent;
  let fixture: ComponentFixture<DashbAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbAnnouncementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
