import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomCurriculumComponent } from './cell-custom-curriculum.component';

describe('CellCustomCurriculumComponent', () => {
  let component: CellCustomCurriculumComponent;
  let fixture: ComponentFixture<CellCustomCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomCurriculumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
