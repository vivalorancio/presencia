import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisiongroupListComponent } from './supervisiongroup-list.component';

describe('SupervisiongroupListComponent', () => {
  let component: SupervisiongroupListComponent;
  let fixture: ComponentFixture<SupervisiongroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisiongroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisiongroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
