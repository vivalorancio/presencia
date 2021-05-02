import { createReducer, on } from '@ngrx/store';
import { EmployeeCalendarCollection } from 'src/app/shared/models/employee.model';
import * as employeesActions from '../actions';

export interface EmployeeCalendarsState {
  error: string | null;
  page: string;
  pending: boolean;
  employee_id: number;
  employeecalendars: EmployeeCalendarCollection;
}

export const initialEmployeeCalendars: EmployeeCalendarsState = {
  error: null,
  page: '',
  pending: false,
  employee_id: -1,
  employeecalendars: { data: [], links: null, meta: null },
};

export const _employeecalendarsReducer = createReducer(
  initialEmployeeCalendars,
  on(
    employeesActions.loadEmployeeCalendars,
    (state, { employee_id, page }) => ({
      ...state,
      page,
      pending: true,
      employee_id,
    })
  ),
  on(
    employeesActions.loadEmployeeCalendarsSuccess,
    (state, { employeecalendars }) => ({
      ...state,
      error: null,
      pending: false,
      employeecalendars,
    })
  ),
  on(employeesActions.loadEmployeeCalendarsFailure, (state, { error }) => ({
    ...initialEmployeeCalendars,
    error,
  })),
  on(employeesActions.addEmployeeCalendar, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    employeesActions.addEmployeeCalendarSuccess,
    (state, { employeecalendar }) => ({
      ...state,
      error: null,
      pending: false,
    })
  ),
  on(employeesActions.addEmployeeCalendarFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(employeesActions.deleteEmployeeCalendar, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(employeesActions.deleteEmployeeCalendarSuccess, (state, { message }) => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(employeesActions.deleteEmployeeCalendarFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function employeecalendarsReducer(state: any, action: any) {
  return _employeecalendarsReducer(state, action);
}
