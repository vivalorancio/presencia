import { createAction, props } from '@ngrx/store';
import {
  Calendar,
  CalendarCollection,
  CalendarResource,
  CalendarShiftCollection,
} from 'src/app/shared/models/calendar.model';

// ------------ Load Calendars ----------
export const loadCalendars = createAction(
  '[Calendar Management] Load Calendars',
  props<{ page: string }>()
);
export const loadCalendarsSuccess = createAction(
  '[Calendar Management] Load Calendars Success',
  props<{ calendars: CalendarCollection }>()
);
export const loadCalendarsFailure = createAction(
  '[Calendar Management] Load Calendars Failure',
  props<{ error: any }>()
);
// ------------ Add Calendar ----------
export const addCalendar = createAction(
  '[Calendar Management] Add Calendar',
  props<{ calendar: Calendar }>()
);
export const addCalendarSuccess = createAction(
  '[Calendar Management] Add Calendar Success',
  props<{ calendar: CalendarResource }>()
);
export const addCalendarFailure = createAction(
  '[Calendar Management] Add Calendar Failure',
  props<{ error: any }>()
);
// ------------ Update Calendar ----------
export const updateCalendar = createAction(
  '[Calendar Management] Update Calendar',
  props<{ calendar: Calendar }>()
);
export const updateCalendarSuccess = createAction(
  '[Calendar Management] Update Calendar Success',
  props<{ calendar: CalendarResource }>()
);
export const updateCalendarFailure = createAction(
  '[Calendar Management] Update Calendar Failure',
  props<{ error: any }>()
);
// ------------ Delete Calendar ----------
export const deleteCalendar = createAction(
  '[Calendar Management] Delete Calendar',
  props<{ id: number }>()
);
export const deleteCalendarSuccess = createAction(
  '[Calendar Management] Delete Calendar Success',
  props<{ message: string }>()
);
export const deleteCalendarFailure = createAction(
  '[Calendar Management] Delete Calendar Failure',
  props<{ error: any }>()
);

// ------------ Load CalendarShifts ----------
export const loadCalendarShifts = createAction(
  '[Calendar Management] Load CalendarShifts',
  props<{ calendar_id: number; page: string }>()
);
export const loadCalendarShiftsSuccess = createAction(
  '[Calendar Management] Load CalendarShifts Success',
  props<{ calendarshifts: CalendarShiftCollection }>()
);
export const loadCalendarShiftsFailure = createAction(
  '[Calendar Management] Load CalendarShifts Failure',
  props<{ error: any }>()
);
// ------------ Update Calendar Shifts----------
export const updateCalendarShifts = createAction(
  '[Calendar Management] Update CalendarShifts',
  props<{ id: number; days: { day: number; shift_id: number | null }[] }>()
);
export const updateCalendarShiftsSuccess = createAction(
  '[Calendar Management] Update CalendarShifts Success',
  props<{ calendarshifts: CalendarShiftCollection }>()
);
export const updateCalendarShiftsFailure = createAction(
  '[Calendar Management] Update CalendarShifts Failure',
  props<{ error: any }>()
);
