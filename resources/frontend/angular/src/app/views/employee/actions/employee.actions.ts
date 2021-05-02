import { createAction, props } from '@ngrx/store';
import {
  Employee,
  EmployeeCalendar,
  EmployeeCalendarCollection,
  EmployeeCalendarResource,
  EmployeeCollection,
  EmployeeResource,
} from 'src/app/shared/models/employee.model';

// ------------ Load Employees ----------
export const loadEmployees = createAction(
  '[Employee Management] Load Employees',
  props<{ page: string }>()
);
export const loadEmployeesSuccess = createAction(
  '[Employee Management] Load Employees Success',
  props<{ employees: EmployeeCollection }>()
);
export const loadEmployeesFailure = createAction(
  '[Employee Management] Load Employees Failure',
  props<{ error: any }>()
);
// ------------ Add Employee ----------
export const addEmployee = createAction(
  '[Employee Management] Add Employee',
  props<{ employee: Employee }>()
);
export const addEmployeeSuccess = createAction(
  '[Employee Management] Add Employee Success',
  props<{ employee: EmployeeResource }>()
);
export const addEmployeeFailure = createAction(
  '[Employee Management] Add Employee Failure',
  props<{ error: any }>()
);
// ------------ Update Employee ----------
export const updateEmployee = createAction(
  '[Employee Management] Update Employee',
  props<{ employee: Employee }>()
);
export const updateEmployeeSuccess = createAction(
  '[Employee Management] Update Employee Success',
  props<{ employee: EmployeeResource }>()
);
export const updateEmployeeFailure = createAction(
  '[Employee Management] Update Employee Failure',
  props<{ error: any }>()
);
// ------------ Delete Employee ----------
export const deleteEmployee = createAction(
  '[Employee Management] Delete Employee',
  props<{ id: number }>()
);
export const deleteEmployeeSuccess = createAction(
  '[Employee Management] Delete Employee Success',
  props<{ message: string }>()
);
export const deleteEmployeeFailure = createAction(
  '[Employee Management] Delete Employee Failure',
  props<{ error: any }>()
);
// ------------ Load EmployeeCalendars ----------
export const loadEmployeeCalendars = createAction(
  '[Employee Management] Load EmployeeCalendars',
  props<{ employee_id: number; page: string }>()
);
export const loadEmployeeCalendarsSuccess = createAction(
  '[Employee Management] Load EmployeeCalendars Success',
  props<{ employeecalendars: EmployeeCalendarCollection }>()
);
export const loadEmployeeCalendarsFailure = createAction(
  '[Employee Management] Load EmployeeCalendars Failure',
  props<{ error: any }>()
);
// ------------ Add EmployeeCalendar ----------
export const addEmployeeCalendar = createAction(
  '[Employee Management] Add EmployeeCalendar',
  props<{ employee_id: number; employeecalendar: EmployeeCalendar }>()
);
export const addEmployeeCalendarSuccess = createAction(
  '[Employee Management] Add EmployeeCalendar Success',
  props<{ employeecalendar: EmployeeCalendarResource }>()
);
export const addEmployeeCalendarFailure = createAction(
  '[Employee Management] Add EmployeeCalendar Failure',
  props<{ error: any }>()
);
// ------------ Delete Employee ----------
export const deleteEmployeeCalendar = createAction(
  '[Employee Management] Delete EmployeeCalendar',
  props<{ employee_id: number; employeecalendar_id: number }>()
);
export const deleteEmployeeCalendarSuccess = createAction(
  '[Employee Management] Delete EmployeeCalendar Success',
  props<{ message: string }>()
);
export const deleteEmployeeCalendarFailure = createAction(
  '[Employee Management] Delete EmployeeCalendar Failure',
  props<{ error: any }>()
);
