import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisiongroupEditComponent } from './supervisiongroup-edit.component';

describe('SupervisiongroupEditComponent', () => {
  let component: SupervisiongroupEditComponent;
  let fixture: ComponentFixture<SupervisiongroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisiongroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisiongroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
