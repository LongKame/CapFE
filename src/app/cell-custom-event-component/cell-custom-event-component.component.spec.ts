import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomEventComponentComponent } from './cell-custom-event-component.component';

describe('CellCustomEventComponentComponent', () => {
  let component: CellCustomEventComponentComponent;
  let fixture: ComponentFixture<CellCustomEventComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomEventComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomEventComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
