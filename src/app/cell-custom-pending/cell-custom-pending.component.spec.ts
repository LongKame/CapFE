import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomPendingComponent } from './cell-custom-pending.component';

describe('CellCustomPendingComponent', () => {
  let component: CellCustomPendingComponent;
  let fixture: ComponentFixture<CellCustomPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
