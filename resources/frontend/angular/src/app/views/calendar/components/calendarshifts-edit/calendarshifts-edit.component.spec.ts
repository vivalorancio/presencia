import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarshiftsEditComponent } from './calendarshifts-edit.component';

describe('CalendarshiftsEditComponent', () => {
  let component: CalendarshiftsEditComponent;
  let fixture: ComponentFixture<CalendarshiftsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarshiftsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarshiftsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
