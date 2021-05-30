import { createReducer, on } from '@ngrx/store';
import { EmployeeHolidayPeriodCollection } from 'src/app/shared/models/employee.model';
import * as employeesActions from '../actions';

export interface EmployeeHolidayPeriodsState {
  error: string | null;
  page: string;
  pending: boolean;
  employee_id: number;
  employeeholidayperiods: EmployeeHolidayPeriodCollection;
}

export const initialEmployeeHolidayPeriods: EmployeeHolidayPeriodsState = {
  error: null,
  page: '',
  pending: false,
  employee_id: -1,
  employeeholidayperiods: { data: [], links: null, meta: null },
};

export const _employeeholidayperiodsReducer = createReducer(
  initialEmployeeHolidayPeriods,
  on(
    employeesActions.loadEmployeeHolidayPeriods,
    (state, { employee_id, page }) => ({
      ...state,
      page,
      pending: true,
      employee_id,
    })
  ),
  on(
    employeesActions.loadEmployeeHolidayPeriodsSuccess,
    (state, { employeeholidayperiods }) => ({
      ...state,
      error: null,
      pending: false,
      employeeholidayperiods,
    })
  ),
  on(
    employeesActions.loadEmployeeHolidayPeriodsFailure,
    (state, { error }) => ({
      ...initialEmployeeHolidayPeriods,
      error,
    })
  ),
  on(employeesActions.addEmployeeHolidayPeriod, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    employeesActions.addEmployeeHolidayPeriodSuccess,
    (state, { employeeholidayperiod }) => ({
      ...state,
      error: null,
      pending: false,
    })
  ),
  on(employeesActions.addEmployeeHolidayPeriodFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(employeesActions.deleteEmployeeHolidayPeriod, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    employeesActions.deleteEmployeeHolidayPeriodSuccess,
    (state, { message }) => ({
      ...state,
      error: null,
      pending: false,
    })
  ),
  on(
    employeesActions.deleteEmployeeHolidayPeriodFailure,
    (state, { error }) => ({
      ...state,
      pending: false,
      error,
    })
  )
);

export function employeeholidayperiodsReducer(state: any, action: any) {
  return _employeeholidayperiodsReducer(state, action);
}
