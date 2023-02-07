import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomClassComponent } from './cell-custom-class.component';

describe('CellCustomClassComponent', () => {
  let component: CellCustomClassComponent;
  let fixture: ComponentFixture<CellCustomClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
