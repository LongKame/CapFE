import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentsInAllClassesComponent } from './view-students-in-all-classes.component';

describe('ViewStudentsInAllClassesComponent', () => {
  let component: ViewStudentsInAllClassesComponent;
  let fixture: ComponentFixture<ViewStudentsInAllClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentsInAllClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentsInAllClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
