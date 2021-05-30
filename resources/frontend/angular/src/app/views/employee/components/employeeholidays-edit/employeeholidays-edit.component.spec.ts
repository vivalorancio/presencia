import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeholidaysEditComponent } from './employeeholidays-edit.component';

describe('EmployeeholidaysEditComponent', () => {
  let component: EmployeeholidaysEditComponent;
  let fixture: ComponentFixture<EmployeeholidaysEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeholidaysEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeholidaysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
