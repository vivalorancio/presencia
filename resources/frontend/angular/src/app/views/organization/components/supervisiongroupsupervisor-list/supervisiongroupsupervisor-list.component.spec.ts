import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisiongroupsupervisorListComponent } from './supervisiongroupsupervisor-list.component';

describe('SupervisiongroupsupervisorListComponent', () => {
  let component: SupervisiongroupsupervisorListComponent;
  let fixture: ComponentFixture<SupervisiongroupsupervisorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisiongroupsupervisorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisiongroupsupervisorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
