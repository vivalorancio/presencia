import { createReducer, on } from '@ngrx/store';
import { CalendarShiftCollection } from 'src/app/shared/models/calendar.model';
import * as calendarsActions from '../actions';

export interface CalendarShiftsState {
  error: string | null;
  page: string;
  pending: boolean;
  calendar_id: number;
  calendarshifts: CalendarShiftCollection;
}

export const initialCalendarShifts: CalendarShiftsState = {
  error: null,
  page: '',
  pending: false,
  calendar_id: -1,
  calendarshifts: { data: [], links: null, meta: null },
};

export const _calendarshiftsReducer = createReducer(
  initialCalendarShifts,
  on(calendarsActions.loadCalendarShifts, (state, { calendar_id, page }) => ({
    ...state,
    page,
    pending: true,
    calendar_id,
  })),
  on(
    calendarsActions.loadCalendarShiftsSuccess,
    (state, { calendarshifts }) => ({
      ...state,
      error: null,
      pending: false,
      calendarshifts,
    })
  ),
  on(calendarsActions.loadCalendarShiftsFailure, (state, { error }) => ({
    ...initialCalendarShifts,
    error,
  })),
  on(calendarsActions.updateCalendarShifts, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    calendarsActions.updateCalendarShiftsSuccess,
    (state, { calendarshifts }) => ({
      ...state,
      pending: false,
      error: null,
      calendarshifts: calendarshifts,
    })
  ),
  on(calendarsActions.updateCalendarShiftsFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function calendarshiftsReducer(state: any, action: any) {
  return _calendarshiftsReducer(state, action);
}
