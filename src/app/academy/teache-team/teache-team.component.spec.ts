import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacheTeamComponent } from './teache-team.component';

describe('TeacheTeamComponent', () => {
  let component: TeacheTeamComponent;
  let fixture: ComponentFixture<TeacheTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacheTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacheTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
