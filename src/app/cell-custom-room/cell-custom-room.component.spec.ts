import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomRoomComponent } from './cell-custom-room.component';

describe('CellCustomRoomComponent', () => {
  let component: CellCustomRoomComponent;
  let fixture: ComponentFixture<CellCustomRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
