import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentInOwnClassComponent } from './view-student-in-own-class.component';

describe('ViewStudentInOwnClassComponent', () => {
  let component: ViewStudentInOwnClassComponent;
  let fixture: ComponentFixture<ViewStudentInOwnClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentInOwnClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentInOwnClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
