import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import {
  Calendar,
  CalendarCollection,
  CalendarShiftCollection,
} from 'src/app/shared/models/calendar.model';
import { Shift, ShiftCollection } from 'src/app/shared/models/shift.model';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';

import * as shiftsActions from '../../../shift/actions';
import * as calendarsActions from '../../actions';
import {
  CalendarDayData,
  CalendarYearData,
} from 'src/app/shared/calendar/models/calendar-data.model';

@Component({
  selector: 'app-calendarshifts-edit',
  templateUrl: './calendarshifts-edit.component.html',
  styleUrls: ['./calendarshifts-edit.component.css'],
})
export class CalendarshiftsEditComponent implements OnInit {
  calendarshifts!: CalendarShiftCollection;
  pending: boolean = false;

  calendars!: CalendarCollection;
  pending_calendars: boolean = false;

  calendar: Calendar = {} as Calendar;

  shifts!: ShiftCollection;
  pending_shifts: boolean = false;

  selectedShiftId: number = -1;

  calendardata: CalendarYearData = { year: -1, days: [] };

  selection: { year: number; day: number }[] = [];

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('calendarshifts').subscribe((calendarshifts) => {
      this.calendarshifts = calendarshifts.calendarshifts;
      this.pending = calendarshifts.pending;
      this.selection = [];
      this.selectedShiftId = -1;
    });

    this.store.select('calendars').subscribe((calendars) => {
      this.calendars = calendars.calendars;
      this.pending_calendars = calendars.pending;
    });

    this.store.select('shifts').subscribe((shifts) => {
      this.shifts = shifts.shifts;
      this.pending_shifts = shifts.pending;
    });
    if (this.shifts.meta === null)
      this.store.dispatch(shiftsActions.loadShifts({ page: '1' }));

    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_calendar: any = (this.calendars?.data.find(
        (calendar: any) => calendar.id === id
      ) || {}) as Calendar;
      if (the_calendar !== {}) {
        this.calendar = the_calendar;
        this.calendardata.year = this.calendar.year;
      }
      this.store.dispatch(
        calendarsActions.loadCalendarShifts({
          calendar_id: this.calendar.id,
          page: '1',
        })
      );
    });
  }

  getTextColourFromName = getTextColourFromName;

  isPending(): boolean {
    return this.pending || this.pending_calendars || this.pending_shifts;
  }

  shift(shift_id: number): Shift {
    return (
      this.shifts.data.find((shift) => shift.id === shift_id) || ({} as Shift)
    );
  }

  getCalendarDayData() {
    this.calendardata.days = [];
    for (let calendarshift of this.calendarshifts.data) {
      let calendardaydata: CalendarDayData = {} as CalendarDayData;
      calendardaydata.day = calendarshift.dayofyear;
      calendardaydata.colour = this.shift(calendarshift.shift_id)?.colour;
      calendardaydata.textcolour = getTextColourFromName(
        this.shift(calendarshift.shift_id)?.colour
      );
      calendardaydata.label = this.shift(calendarshift.shift_id)?.code;
      calendardaydata.tooltip = this.shift(calendarshift.shift_id)?.description;

      this.calendardata.days.push(calendardaydata);
    }
    return this.calendardata;
  }

  assignToSelected() {
    let calendarshiftstosave: { day: number; shift_id: number | null }[] = [];
    calendarshiftstosave = this.calendarshifts.data.map((calendarshift) => {
      return { day: calendarshift.dayofyear, shift_id: calendarshift.shift_id };
    });
    let calendarshiftsselected = this.selection
      .filter((dayselected) => dayselected.year === this.calendar.year)
      .map((dayselected) => {
        return {
          day: dayselected.day,
          shift_id: this.selectedShiftId !== -1 ? this.selectedShiftId : null,
        };
      });

    for (let i = 0; i < calendarshiftsselected.length; i++) {
      let index = calendarshiftstosave.findIndex(
        (calendarshift) => calendarshift.day === calendarshiftsselected[i].day
      );
      if (index >= 0) {
        calendarshiftstosave[index].shift_id =
          calendarshiftsselected[i].shift_id;
      } else {
        calendarshiftstosave.push(calendarshiftsselected[i]);
      }
    }

    this.store.dispatch(
      calendarsActions.updateCalendarShifts({
        id: this.calendar.id,
        days: calendarshiftstosave,
      })
    );
  }
}
