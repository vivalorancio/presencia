import { createReducer, on } from '@ngrx/store';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import {
  Booking,
  DayBookingsCollection,
} from 'src/app/shared/models/booking.model';
import { DisplayBookingsCollection } from 'src/app/shared/models/resource.model';
import * as employeesActions from '../actions';

export interface BookingState {
  error: string | null;
  res: string | null;
  pending: boolean;
  employee_id: number;
  //booking: Booking;
}

export const initialBookingState: BookingState = {
  error: null,
  res: null,
  pending: false,
  employee_id: -1,
  // bookings: { data: [], links: null, meta: null },
};

export const _bookingReducer = createReducer(
  initialBookingState,
  on(employeesActions.book, (state, { employee_id, booking }) => ({
    ...initialBookingState,
    pending: true,
    employee_id,
  })),
  on(employeesActions.bookSuccess, (state, { res }) => ({
    ...state,
    error: null,
    pending: false,
    res,
  })),
  on(employeesActions.bookFailure, (state, { error }) => ({
    ...initialBookingState,
    error,
    pending: false,
    res: null,
  })),
  on(
    employeesActions.addEmployeeBooking,
    (state, { employee_id, booking }) => ({
      ...initialBookingState,
      pending: true,
      employee_id,
    })
  ),
  on(employeesActions.addEmployeeBookingSuccess, (state, { res }) => ({
    ...state,
    error: null,
    pending: false,
    res,
  })),
  on(employeesActions.addEmployeeBookingFailure, (state, { error }) => ({
    ...initialBookingState,
    error,
    pending: false,
    res: null,
  }))
);

export function bookingReducer(state: any, action: any) {
  return _bookingReducer(state, action);
}
