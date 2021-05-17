import { createReducer, on } from '@ngrx/store';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import { DayBookingsCollection } from 'src/app/shared/models/booking.model';
import { DisplayBookingsCollection } from 'src/app/shared/models/resource.model';
import * as employeesActions from '../actions';

export interface BookingsState {
  error: string | null;
  pending: boolean;
  employee_id: number;
  bookingsdisplay: DisplayBookingsCollection;
  bookings: DayBookingsCollection;
}

export const initialBookingsState: BookingsState = {
  error: null,
  pending: false,
  employee_id: -1,
  bookingsdisplay: {
    range: 'week',
    date: dateAAAAMMDD(new Date(Date.now())),
  },
  bookings: { data: [], links: null, meta: null },
};

export const _bookingsReducer = createReducer(
  initialBookingsState,
  on(employeesActions.initEmployeeBookings, (state) => ({
    ...initialBookingsState,
  })),
  on(
    employeesActions.loadEmployeeBookings,
    (state, { employee_id, bookingsdisplay }) => ({
      ...state,
      pending: true,
      employee_id,
      bookingsdisplay,
    })
  ),
  on(employeesActions.loadEmployeeBookingsSuccess, (state, { bookings }) => ({
    ...state,
    error: null,
    pending: false,
    bookings,
  })),
  on(employeesActions.loadEmployeeBookingsFailure, (state, { error }) => ({
    ...initialBookingsState,
    error,
  }))
);

export function bookingsReducer(state: any, action: any) {
  return _bookingsReducer(state, action);
}
