import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbGamesComponent } from './dashb-games.component';

describe('DashbGamesComponent', () => {
  let component: DashbGamesComponent;
  let fixture: ComponentFixture<DashbGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashbGamesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashbGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
