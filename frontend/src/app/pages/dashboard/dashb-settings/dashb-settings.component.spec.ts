import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbSettingsComponent } from './dashb-settings.component';

describe('DashbSettingsComponent', () => {
  let component: DashbSettingsComponent;
  let fixture: ComponentFixture<DashbSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
