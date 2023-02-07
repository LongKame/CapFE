import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomAcaComponent } from './cell-custom-aca.component';

describe('CellCustomAcaComponent', () => {
  let component: CellCustomAcaComponent;
  let fixture: ComponentFixture<CellCustomAcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomAcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomAcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
