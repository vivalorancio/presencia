import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayperiodListComponent } from './holidayperiod-list.component';

describe('HolidayperiodListComponent', () => {
  let component: HolidayperiodListComponent;
  let fixture: ComponentFixture<HolidayperiodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayperiodListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayperiodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
