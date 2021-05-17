import { createReducer, on } from '@ngrx/store';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import {
  Booking,
  BookingResource,
  DayBookingsCollection,
} from 'src/app/shared/models/booking.model';
import { DisplayBookingsCollection } from 'src/app/shared/models/resource.model';
import * as employeesActions from '../actions';

export interface BookingState {
  error: string | null;
  res: string | null;
  pending: boolean;
  employee_id: number;
  booking: BookingResource;
}

export const initialBookingState: BookingState = {
  error: null,
  res: null,
  pending: false,
  employee_id: -1,
  booking: {} as BookingResource,
};

export const _bookingReducer = createReducer(
  initialBookingState,
  on(employeesActions.loadBooking, (state, { employee_id, booking_id }) => ({
    ...state,
    employee_id,
    booking: initialBookingState.booking,
    pending: true,
  })),
  on(employeesActions.loadBookingSuccess, (state, { booking }) => ({
    ...state,
    error: null,
    pending: false,
    booking,
  })),
  on(employeesActions.loadBookingFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
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
  })),
  on(
    employeesActions.updateEmployeeBooking,
    (state, { employee_id, booking }) => ({
      ...state,
      pending: true,
      error: null,
    })
  ),
  on(employeesActions.updateEmployeeBookingSuccess, (state, { res }) => ({
    ...state,
    res,
    pending: false,
    error: null,
  })),
  on(employeesActions.updateEmployeeBookingFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(
    employeesActions.deleteEmployeeBooking,
    (state, { employee_id, booking_id }) => ({
      ...state,
      pending: true,
      error: null,
    })
  ),
  on(employeesActions.deleteEmployeeBookingSuccess, (state, { message }) => ({
    ...state,
    res: message,
    pending: false,
    error: null,
  })),
  on(employeesActions.deleteEmployeeBookingFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function bookingReducer(state: any, action: any) {
  return _bookingReducer(state, action);
}
