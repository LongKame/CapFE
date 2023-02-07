import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomTeacherComponent } from './cell-custom-teacher.component';

describe('CellCustomTeacherComponent', () => {
  let component: CellCustomTeacherComponent;
  let fixture: ComponentFixture<CellCustomTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
