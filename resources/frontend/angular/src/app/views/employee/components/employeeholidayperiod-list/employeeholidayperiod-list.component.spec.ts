import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeholidayperiodListComponent } from './employeeholidayperiod-list.component';

describe('EmployeeholidayperiodListComponent', () => {
  let component: EmployeeholidayperiodListComponent;
  let fixture: ComponentFixture<EmployeeholidayperiodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeholidayperiodListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeholidayperiodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
