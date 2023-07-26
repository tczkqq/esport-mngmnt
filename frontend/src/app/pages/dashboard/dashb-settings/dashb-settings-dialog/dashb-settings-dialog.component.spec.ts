import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbSettingsDialogComponent } from './dashb-settings-dialog.component';

describe('DashbSettingsDialogComponent', () => {
  let component: DashbSettingsDialogComponent;
  let fixture: ComponentFixture<DashbSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbSettingsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
