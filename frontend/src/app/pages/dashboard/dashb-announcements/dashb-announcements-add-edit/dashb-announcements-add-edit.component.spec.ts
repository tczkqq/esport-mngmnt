import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbAnnouncementsAddEditComponent } from './dashb-announcements-add-edit.component';

describe('DashbAnnouncementsAddEditComponent', () => {
  let component: DashbAnnouncementsAddEditComponent;
  let fixture: ComponentFixture<DashbAnnouncementsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbAnnouncementsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbAnnouncementsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
