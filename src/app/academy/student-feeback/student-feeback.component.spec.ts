import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeebackComponent } from './student-feeback.component';

describe('StudentFeebackComponent', () => {
  let component: StudentFeebackComponent;
  let fixture: ComponentFixture<StudentFeebackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFeebackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFeebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
