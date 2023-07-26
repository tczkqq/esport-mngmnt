import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbPlayersDialogComponent } from './dashb-players-dialog.component';

describe('DashbPlayersDialogComponent', () => {
  let component: DashbPlayersDialogComponent;
  let fixture: ComponentFixture<DashbPlayersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbPlayersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbPlayersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
