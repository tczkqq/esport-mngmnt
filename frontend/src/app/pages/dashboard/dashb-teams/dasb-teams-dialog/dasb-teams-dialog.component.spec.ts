import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasbTeamsDialogComponent } from './dasb-teams-dialog.component';

describe('DasbTeamsDialogComponent', () => {
  let component: DasbTeamsDialogComponent;
  let fixture: ComponentFixture<DasbTeamsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasbTeamsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasbTeamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
