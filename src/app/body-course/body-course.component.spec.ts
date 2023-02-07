import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCourseComponent } from './body-course.component';

describe('BodyCourseComponent', () => {
  let component: BodyCourseComponent;
  let fixture: ComponentFixture<BodyCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
