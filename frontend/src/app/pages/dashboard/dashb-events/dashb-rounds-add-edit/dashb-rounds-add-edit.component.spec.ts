import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbRoundsAddEditComponent } from './dashb-rounds-add-edit.component';

describe('DashbRoundsAddEditComponent', () => {
  let component: DashbRoundsAddEditComponent;
  let fixture: ComponentFixture<DashbRoundsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbRoundsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbRoundsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
