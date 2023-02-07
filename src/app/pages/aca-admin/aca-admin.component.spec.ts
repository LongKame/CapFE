import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaAdminComponent } from './aca-admin.component';

describe('AcaAdminComponent', () => {
  let component: AcaAdminComponent;
  let fixture: ComponentFixture<AcaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
