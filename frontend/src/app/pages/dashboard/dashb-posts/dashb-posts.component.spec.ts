import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbPostsComponent } from './dashb-posts.component';

describe('DashbPostsComponent', () => {
  let component: DashbPostsComponent;
  let fixture: ComponentFixture<DashbPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
