import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPostsAddComponent } from './dash-posts-add.component';

describe('DashPostsAddComponent', () => {
  let component: DashPostsAddComponent;
  let fixture: ComponentFixture<DashPostsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashPostsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashPostsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
