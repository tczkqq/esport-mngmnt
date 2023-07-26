import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbStatusesDialogComponent } from './dashb-statuses-dialog.component';

describe('DashbStatusesDialogComponent', () => {
  let component: DashbStatusesDialogComponent;
  let fixture: ComponentFixture<DashbStatusesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbStatusesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbStatusesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
