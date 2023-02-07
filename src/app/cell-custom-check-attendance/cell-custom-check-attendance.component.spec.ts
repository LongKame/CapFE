import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomCheckAttendanceComponent } from './cell-custom-check-attendance.component';

describe('CellCustomCheckAttendanceComponent', () => {
  let component: CellCustomCheckAttendanceComponent;
  let fixture: ComponentFixture<CellCustomCheckAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomCheckAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomCheckAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
