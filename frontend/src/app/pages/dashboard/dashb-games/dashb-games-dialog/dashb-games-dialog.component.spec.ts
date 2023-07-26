import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbGamesDialogComponent } from './dashb-games-dialog.component';

describe('GamesDialogComponent', () => {
  let component: DashbGamesDialogComponent;
  let fixture: ComponentFixture<DashbGamesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashbGamesDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashbGamesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
