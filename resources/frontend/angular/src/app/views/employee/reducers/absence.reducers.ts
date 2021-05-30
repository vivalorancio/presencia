import { createReducer, on } from '@ngrx/store';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import {
  Absence,
  AbsenceResource,
  DayBookingsCollection,
} from 'src/app/shared/models/booking.model';
import { DisplayBookingsCollection } from 'src/app/shared/models/resource.model';
import * as employeesActions from '../actions';

export interface AbsenceState {
  error: string | null;
  res: string | null;
  pending: boolean;
  employee_id: number;
  absence: AbsenceResource;
}

export const initialAbsenceState: AbsenceState = {
  error: null,
  res: null,
  pending: false,
  employee_id: -1,
  absence: {} as AbsenceResource,
};

export const _absenceReducer = createReducer(
  initialAbsenceState,
  on(employeesActions.loadAbsence, (state, { employee_id, absence_id }) => ({
    ...state,
    employee_id,
    absence: initialAbsenceState.absence,
    pending: true,
  })),
  on(employeesActions.loadAbsenceSuccess, (state, { absence }) => ({
    ...state,
    error: null,
    pending: false,
    absence,
  })),
  on(employeesActions.loadAbsenceFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(
    employeesActions.addEmployeeAbsence,
    (state, { employee_id, absence }) => ({
      ...initialAbsenceState,
      pending: true,
      employee_id,
    })
  ),
  on(employeesActions.addEmployeeAbsenceSuccess, (state, { res }) => ({
    ...state,
    error: null,
    pending: false,
    // res,
  })),
  on(employeesActions.addEmployeeAbsenceFailure, (state, { error }) => ({
    ...initialAbsenceState,
    error,
    pending: false,
    res: null,
  })),
  on(
    employeesActions.updateEmployeeAbsence,
    (state, { employee_id, absence }) => ({
      ...state,
      pending: true,
      error: null,
    })
  ),
  on(employeesActions.updateEmployeeAbsenceSuccess, (state, { res }) => ({
    ...state,
    // res,
    pending: false,
    error: null,
  })),
  on(employeesActions.updateEmployeeAbsenceFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(
    employeesActions.deleteEmployeeAbsence,
    (state, { employee_id, absence_id }) => ({
      ...state,
      pending: true,
      error: null,
    })
  ),
  on(employeesActions.deleteEmployeeAbsenceSuccess, (state, { message }) => ({
    ...state,
    // res: message,
    pending: false,
    error: null,
  })),
  on(employeesActions.deleteEmployeeAbsenceFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function absenceReducer(state: any, action: any) {
  return _absenceReducer(state, action);
}
