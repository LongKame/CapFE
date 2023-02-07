import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomCourseComponent } from './cell-custom-course.component';

describe('CellCustomCourseComponent', () => {
  let component: CellCustomCourseComponent;
  let fixture: ComponentFixture<CellCustomCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
