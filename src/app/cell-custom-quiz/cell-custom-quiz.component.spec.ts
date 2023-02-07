import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomQuizComponent } from './cell-custom-quiz.component';

describe('CellCustomQuizComponent', () => {
  let component: CellCustomQuizComponent;
  let fixture: ComponentFixture<CellCustomQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
