import { createAction, props } from '@ngrx/store';
import {
  Employee,
  EmployeeResource,
} from 'src/app/shared/models/employee.model';
import { User } from 'src/app/shared/models/user.model';

// ------------ Login ----------
// export const requirelogin = createAction('[Authentication] Require Login');
export const login = createAction(
  '[Authentication] Login',
  props<{ username: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Authentication] Login Success',
  props<{ user: User }>()
);
export const loginFailure = createAction(
  '[Authentication] Login Failure',
  props<{ error: any }>()
);

// ------------ Logout ----------
export const logout = createAction('[Authentication] Logout');

export const logoutSuccess = createAction('[Authentication] Logout Success');

export const logoutFailure = createAction(
  '[Authentication] Logout Failure',
  props<{ error: any }>()
);

// ------------ User ----------
export const getUser = createAction('[Authentication] Get User');
export const getUserSuccess = createAction(
  '[Authentication] Get User Success',
  props<{ user: User }>()
);

export const getUserFailure = createAction(
  '[Authentication] Get User Failure',
  props<{ error: any }>()
);

// ------------ Employee ----------
export const getEmployee = createAction(
  '[Authentication] Get Employee',
  props<{ employee_id: number }>()
);
export const getEmployeeSuccess = createAction(
  '[Authentication] Get Employee Success',
  props<{ employee: EmployeeResource }>()
);

export const getEmployeeFailure = createAction(
  '[Authentication] Get Employee Failure',
  props<{ error: any }>()
);
