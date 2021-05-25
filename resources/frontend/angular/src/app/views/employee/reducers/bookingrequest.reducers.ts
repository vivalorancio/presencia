import { createReducer, on } from '@ngrx/store';
import { BookingRequest } from 'src/app/shared/models/request.model';
import * as employeesActions from '../actions';

export interface BookingRequestState {
  error: string | null;
  res: string | null;
  pending: boolean;
  employee_id: number;
}

export const initialBookingrequestState: BookingRequestState = {
  error: null,
  res: null,
  pending: false,
  employee_id: -1,
};

export const _bookingrequestReducer = createReducer(
  initialBookingrequestState,
  on(employeesActions.addBookingRequest, (state, { employee_id, request }) => ({
    ...initialBookingrequestState,
    employee_id,
    pending: true,
  })),
  on(employeesActions.addBookingRequestSuccess, (state, { res }) => ({
    ...state,
    pending: false,
    error: null,
    res,
  })),
  on(employeesActions.addBookingRequestFailure, (state, { error }) => ({
    ...state,
    pending: false,
    res: null,
    error,
  })),
  on(
    employeesActions.updateBookingRequest,
    (state, { employee_id, request }) => ({
      ...state,
      pending: true,
      error: null,
    })
  ),
  on(employeesActions.updateBookingRequestSuccess, (state, { res }) => ({
    ...state,
    res,
    pending: false,
    error: null,
  })),
  on(employeesActions.updateBookingRequestFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(
    employeesActions.deleteBookingRequest,
    (state, { employee_id, request_id }) => ({
      ...state,
      pending: true,
      error: null,
    })
  ),
  on(employeesActions.deleteBookingRequestSuccess, (state, { message }) => ({
    ...state,
    res: message,
    pending: false,
    error: null,
  })),
  on(employeesActions.deleteBookingRequestFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function bookingrequestReducer(state: any, action: any) {
  return _bookingrequestReducer(state, action);
}
