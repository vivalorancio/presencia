import { createReducer, on } from '@ngrx/store';
import {
  EmployeeCollection,
  EmployeeResource,
  EmployeeSearch,
} from 'src/app/shared/models/employee.model';
import {
  Incidence,
  IncidenceCollection,
} from 'src/app/shared/models/incidence.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
import { ShiftResource } from 'src/app/shared/models/shift.model';
import * as employeesActions from '../actions';

export interface EmployeeState {
  error: string | null;
  pending: boolean;
  employee: EmployeeResource;
  shift: ShiftResource;
  incidences: IncidenceCollection;
}

export const initialEmployeeState: EmployeeState = {
  error: null,
  pending: false,
  employee: {} as EmployeeResource,
  shift: {} as ShiftResource,
  incidences: {} as IncidenceCollection,
};

export const _employeeReducer = createReducer(
  initialEmployeeState,
  on(employeesActions.loadEmployee, (state) => ({
    ...state,
    employee: initialEmployeeState.employee,
    pending: true,
  })),
  on(employeesActions.loadEmployeeSuccess, (state, { employee }) => ({
    ...state,
    error: null,
    pending: false,
    employee,
  })),
  on(employeesActions.loadEmployeeFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(employeesActions.loadEmployeeShift, (state) => ({
    ...state,
    shift: initialEmployeeState.shift,
    pending: true,
  })),
  on(employeesActions.loadEmployeeShiftSuccess, (state, { shift }) => ({
    ...state,
    error: null,
    pending: false,
    shift,
  })),
  on(employeesActions.loadEmployeeShiftFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(employeesActions.loadEmployeeIncidences, (state) => ({
    ...state,
    incidences: initialEmployeeState.incidences,
    pending: true,
  })),
  on(
    employeesActions.loadEmployeeIncidencesSuccess,
    (state, { incidences }) => ({
      ...state,
      error: null,
      pending: false,
      incidences,
    })
  ),
  on(employeesActions.loadEmployeeIncidencesFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function employeeReducer(state: any, action: any) {
  return _employeeReducer(state, action);
}
