import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomStudentComponent } from './cell-custom-student.component';

describe('CellCustomStudentComponent', () => {
  let component: CellCustomStudentComponent;
  let fixture: ComponentFixture<CellCustomStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
