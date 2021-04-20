import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  Calendar,
  CalendarCollection,
} from 'src/app/shared/models/calendar.model';
import * as calendarsActions from '../actions';

export interface CalendarsState {
  error: string | null;
  page: string;
  pending: boolean;
  calendars: CalendarCollection;
}

export const initialCalendarsState: CalendarsState = {
  error: null,
  page: '',
  pending: false,
  calendars: { data: [], links: null, meta: null },
};

export const _calendarsReducer = createReducer(
  initialCalendarsState,
  on(calendarsActions.loadCalendars, (state, { page }) => ({
    ...state,
    page,
    pending: true,
  })),
  on(calendarsActions.loadCalendarsSuccess, (state, { calendars }) => ({
    ...state,
    error: null,
    pending: false,
    calendars,
  })),
  on(calendarsActions.loadCalendarsFailure, (state, { error }) => ({
    ...initialCalendarsState,
    error,
  })),
  on(calendarsActions.addCalendar, (state, { calendar }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(calendarsActions.addCalendarSuccess, (state, { calendar }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(calendarsActions.addCalendarFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(calendarsActions.updateCalendar, (state, { calendar }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(calendarsActions.updateCalendarSuccess, (state, { calendar }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(calendarsActions.updateCalendarFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(calendarsActions.deleteCalendar, (state, { id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(calendarsActions.deleteCalendarSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(calendarsActions.deleteCalendarFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function calendarsReducer(state: any, action: any) {
  return _calendarsReducer(state, action);
}
