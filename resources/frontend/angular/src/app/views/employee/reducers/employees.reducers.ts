import { createReducer, on } from '@ngrx/store';
import {
  EmployeeCollection,
  EmployeeSearch,
} from 'src/app/shared/models/employee.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
import * as employeesActions from '../actions';

export interface EmployeesState {
  error: string | null;
  display: DisplayResourceCollection;
  search: EmployeeSearch;
  pending: boolean;
  employees: EmployeeCollection;
}

export const initialState: EmployeesState = {
  error: null,
  display: {
    page: '1',
    per_page: '25',
    sort_field: 'last_name',
    sort_direction: 'asc',
  },
  search: {} as EmployeeSearch,
  pending: false,
  employees: { data: [], links: null, meta: null },
};

export const _employeesReducer = createReducer(
  initialState,
  on(employeesActions.initEmployees, (state) => ({ ...initialState })),
  on(employeesActions.loadEmployees, (state, { display, search }) => ({
    ...state,
    display,
    search,
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
