import { createReducer, on } from '@ngrx/store';
import { EmployeeHolidayCollection } from 'src/app/shared/models/employee.model';
import * as employeesActions from '../actions';

export interface EmployeeHolidaysState {
  error: string | null;
  page: string;
  pending: boolean;
  employee_id: number;
  employeeholidayperiod_id: number;
  employeeholidays: EmployeeHolidayCollection;
}

export const initialEmployeeHolidays: EmployeeHolidaysState = {
  error: null,
  page: '',
  pending: false,
  employee_id: -1,
  employeeholidayperiod_id: -1,
  employeeholidays: { data: [], links: null, meta: null },
};

export const _employeeholidaysReducer = createReducer(
  initialEmployeeHolidays,
  on(
    employeesActions.loadEmployeeHolidays,
    (state, { employee_id, employeeholidayperiod_id, page }) => ({
      ...state,
      page,
      pending: true,
      employee_id,
      employeeholidayperiod_id,
    })
  ),
  on(
    employeesActions.loadEmployeeHolidaysSuccess,
    (state, { employeeholidays }) => ({
      ...state,
      error: null,
      pending: false,
      employeeholidays,
    })
  ),
  on(employeesActions.loadEmployeeHolidaysFailure, (state, { error }) => ({
    ...initialEmployeeHolidays,
    error,
  })),
  on(employeesActions.addEmployeeHoliday, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    employeesActions.addEmployeeHolidaySuccess,
    (state, { employeeholidays }) => ({
      ...state,
      error: null,
      pending: false,
    })
  ),
  on(employeesActions.addEmployeeHolidayFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(employeesActions.deleteEmployeeHoliday, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(employeesActions.deleteEmployeeHolidaySuccess, (state, { message }) => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(employeesActions.deleteEmployeeHolidayFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function employeeholidaysReducer(state: any, action: any) {
  return _employeeholidaysReducer(state, action);
}
