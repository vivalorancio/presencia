import { createReducer, on } from '@ngrx/store';
import {
  Employee,
  EmployeeResource,
} from 'src/app/shared/models/employee.model';
import { User } from 'src/app/shared/models/user.model';
import * as authenticationActions from '../actions';

export interface AuthenticationState {
  logeddin: boolean;
  error: string | null;
  pending: boolean;
  user: User;
  employee: EmployeeResource;
}

export const initialState: AuthenticationState = {
  logeddin: false,
  error: null,
  pending: false,
  user: {} as User,
  employee: {} as EmployeeResource,
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
  }))
);

export function authenticationReducer(state: any, action: any) {
  return _authenticationReducer(state, action);
}
