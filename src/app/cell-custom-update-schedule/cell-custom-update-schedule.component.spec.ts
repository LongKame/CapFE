import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomUpdateScheduleComponent } from './cell-custom-update-schedule.component';

describe('CellCustomUpdateScheduleComponent', () => {
  let component: CellCustomUpdateScheduleComponent;
  let fixture: ComponentFixture<CellCustomUpdateScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomUpdateScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomUpdateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
