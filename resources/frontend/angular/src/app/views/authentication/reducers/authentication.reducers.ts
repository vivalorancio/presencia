import { createReducer, on } from '@ngrx/store';
import {
  Employee,
  EmployeeResource,
} from 'src/app/shared/models/employee.model';
import { Incidence } from 'src/app/shared/models/incidence.model';
import { ShiftResource } from 'src/app/shared/models/shift.model';
import { User } from 'src/app/shared/models/user.model';
import * as authenticationActions from '../actions';

export interface AuthenticationState {
  logeddin: boolean;
  error: string | null;
  pending: boolean;
  user: User;
  employee: EmployeeResource;
  shift: ShiftResource;
  incidences: Incidence[];
}

export const initialState: AuthenticationState = {
  logeddin: false,
  error: null,
  pending: false,
  user: {} as User,
  employee: {} as EmployeeResource,
  shift: {} as ShiftResource,
  incidences: [],
};

export const _authenticationReducer = createReducer(
  initialState,
  // on(authenticationActions.requirelogin, () => initialState),
  on(authenticationActions.login, (state) => ({
    ...initialState,
    pending: true,
  })),
  on(authenticationActions.loginSuccess, (state, { user }) => ({
    ...state,
    logeddin: true,
    error: null,
    pending: false,
    user,
  })),
  on(authenticationActions.loginFailure, (state, { error }) => ({
    ...initialState,
    error,
  })),
  on(authenticationActions.logout, (state) => initialState),
  on(authenticationActions.getUser, (state) => ({
    ...initialState,
    pending: true,
  })),
  on(authenticationActions.getUserSuccess, (state, { user }) => ({
    ...state,
    logeddin: true,
    error: null,
    pending: false,
    user,
  })),
  on(authenticationActions.getUserFailure, (state, { error }) => ({
    ...initialState,
    error,
  })),
  on(authenticationActions.getEmployee, (state) => ({
    ...state,
    pending: true,
  })),
  on(authenticationActions.getEmployeeSuccess, (state, { employee }) => ({
    ...state,
    error: null,
    pending: false,
    employee,
  })),
  on(authenticationActions.getEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
    employee: {} as EmployeeResource,
  })),
  on(authenticationActions.getEmployeeShift, (state) => ({
    ...state,
    pending: true,
  })),
  on(authenticationActions.getEmployeeShiftSuccess, (state, { shift }) => ({
    ...state,
    error: null,
    pending: false,
    shift,
  })),
  on(authenticationActions.getEmployeeShiftFailure, (state, { error }) => ({
    ...state,
    error,
    shift: {} as ShiftResource,
  })),
  on(authenticationActions.getEmployeeIncidences, (state) => ({
    ...state,
    pending: true,
  })),
  on(
    authenticationActions.getEmployeeIncidencesSuccess,
    (state, { incidences }) => ({
      ...state,
      error: null,
      pending: false,
      incidences,
    })
  ),
  on(
    authenticationActions.getEmployeeIncidencesFailure,
    (state, { error }) => ({
      ...state,
      error,
      incidences: [],
    })
  )
);

export function authenticationReducer(state: any, action: any) {
  return _authenticationReducer(state, action);
}
