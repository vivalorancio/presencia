import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeecalendarListComponent } from './employeecalendar-list.component';

describe('EmployeecalendarListComponent', () => {
  let component: EmployeecalendarListComponent;
  let fixture: ComponentFixture<EmployeecalendarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeecalendarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeecalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
