import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayperiodEditComponent } from './holidayperiod-edit.component';

describe('HolidayperiodEditComponent', () => {
  let component: HolidayperiodEditComponent;
  let fixture: ComponentFixture<HolidayperiodEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayperiodEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayperiodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
