import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbPlayersComponent } from './dashb-players.component';

describe('DashbPlayersComponent', () => {
  let component: DashbPlayersComponent;
  let fixture: ComponentFixture<DashbPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbPlayersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
