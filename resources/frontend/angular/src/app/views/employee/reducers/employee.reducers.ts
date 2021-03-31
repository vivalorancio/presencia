import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  Employee,
  EmployeeCollection,
} from 'src/app/shared/models/employee.model';
import * as employeesActions from '../actions';

export interface EmployeesState {
  error: string | null;
  page: string;
  pending: boolean;
  employees: EmployeeCollection;
}

export const initialState: EmployeesState = {
  error: null,
  page: '',
  pending: false,
  employees: { data: [], links: null, meta: null },
};

export const _employeesReducer = createReducer(
  initialState,
  on(employeesActions.loadEmployees, (state, { page }) => ({
    ...state,
    page,
    pending: true,
  })),
  on(employeesActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    error: null,
    pending: false,
    employees,
  })),
  on(employeesActions.loadEmployeesFailure, (state, { error }) => ({
    ...initialState,
    error,
  })),
  on(employeesActions.addEmployee, (state, { employee }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(employeesActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(employeesActions.addEmployeeFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(employeesActions.updateEmployee, (state, { employee }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(employeesActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(employeesActions.updateEmployeeFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(employeesActions.deleteEmployee, (state, { id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(employeesActions.deleteEmployeeSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(employeesActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function employeesReducer(state: any, action: any) {
  return _employeesReducer(state, action);
}
