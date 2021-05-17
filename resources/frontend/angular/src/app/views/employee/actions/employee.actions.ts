import { createAction, props } from '@ngrx/store';
import {
  Booking,
  DayBookingsCollection,
} from 'src/app/shared/models/booking.model';
import {
  Employee,
  EmployeeCalendar,
  EmployeeCalendarCollection,
  EmployeeCalendarResource,
  EmployeeCollection,
  EmployeeResource,
  EmployeeSearch,
} from 'src/app/shared/models/employee.model';
import {
  Incidence,
  IncidenceCollection,
} from 'src/app/shared/models/incidence.model';
import {
  DisplayBookingsCollection,
  DisplayResourceCollection,
} from 'src/app/shared/models/resource.model';
import { ShiftResource } from 'src/app/shared/models/shift.model';

// ------------ Init Employees ----------
export const initEmployees = createAction(
  '[Employee Management] Init Employees'
);
// ------------ Load Employees ----------
export const loadEmployees = createAction(
  '[Employee Management] Load Employees',
  props<{
    display: DisplayResourceCollection;
    search: EmployeeSearch;
  }>()
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
// ------------ Employee Bookings----------
export const initEmployeeBookings = createAction(
  '[Employee] Init Employee Bookings',
  props<{ employee_id: number }>()
);
export const loadEmployeeBookings = createAction(
  '[Employee] Load Employee Bookings',
  props<{ employee_id: number; bookingsdisplay: DisplayBookingsCollection }>()
);
export const loadEmployeeBookingsSuccess = createAction(
  '[Employee] Load Employee Bookings Success',
  props<{ bookings: DayBookingsCollection }>()
);

export const loadEmployeeBookingsFailure = createAction(
  '[Employee] Load Employee Bookings Failure',
  props<{ error: any }>()
);
// ------------ Book ----------
export const book = createAction(
  '[Employee] Book',
  props<{ employee_id: number; booking: Booking }>()
);
export const bookSuccess = createAction(
  '[Employee] Book Success',
  props<{ res: any }>()
);
export const bookFailure = createAction(
  '[Employee] Book Failure',
  props<{ error: any }>()
);
// ------------ Add Employee Booking ----------
export const addEmployeeBooking = createAction(
  '[Employee] Add EmployeeBooking',
  props<{ employee_id: number; booking: Booking }>()
);
export const addEmployeeBookingSuccess = createAction(
  '[Employee] Add EmployeeBooking Success',
  props<{ res: any }>()
);
export const addEmployeeBookingFailure = createAction(
  '[Employee] Add EmployeeBooking Failure',
  props<{ error: any }>()
);

// ------------ Employee ----------
export const loadEmployee = createAction(
  '[Employee] Load Employee',
  props<{ employee_id: number }>()
);
export const loadEmployeeSuccess = createAction(
  '[Employee] Load Employee Success',
  props<{ employee: EmployeeResource }>()
);

export const loadEmployeeFailure = createAction(
  '[Employee] Load Employee Failure',
  props<{ error: any }>()
);

// ------------ Employee Today Shift----------
export const loadEmployeeShift = createAction(
  '[Employee] Load EmployeeShift',
  props<{ employee_id: number }>()
);
export const loadEmployeeShiftSuccess = createAction(
  '[Employee] Load EmployeeShift Success',
  props<{ shift: ShiftResource }>()
);

export const loadEmployeeShiftFailure = createAction(
  '[Employee] Load EmployeeShift Failure',
  props<{ error: any }>()
);
// ------------ Employee Incidences----------
export const loadEmployeeIncidences = createAction(
  '[Employee] Load Employee Incidences',
  props<{ employee_id: number }>()
);
export const loadEmployeeIncidencesSuccess = createAction(
  '[Employee] Load Employee Incidences Success',
  props<{ incidences: IncidenceCollection }>()
);

export const loadEmployeeIncidencesFailure = createAction(
  '[Employee] Load Employee Incidences Failure',
  props<{ error: any }>()
);
