import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcaComponent } from './view-aca.component';

describe('ViewAcaComponent', () => {
  let component: ViewAcaComponent;
  let fixture: ComponentFixture<ViewAcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
