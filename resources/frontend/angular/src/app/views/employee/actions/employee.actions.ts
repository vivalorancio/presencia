import { createAction, props } from '@ngrx/store';
import {
  Absence,
  AbsenceResource,
  Booking,
  BookingResource,
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
  AbsenceRequest,
  BookingRequest,
  Request,
  RequestCollection,
} from 'src/app/shared/models/request.model';
import {
  DisplayBookingsCollection,
  DisplayRequestsCollection,
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
// ------------ Delete EmployeeCalendar ----------
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

// ------------ Load Booking ----------
export const loadBooking = createAction(
  '[Employee] Load Booking',
  props<{ employee_id: number; booking_id: number }>()
);
export const loadBookingSuccess = createAction(
  '[Employee] Load Booking Success',
  props<{ booking: BookingResource }>()
);

export const loadBookingFailure = createAction(
  '[Employee] Load Booking Failure',
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
// ------------ Update Employee Booking ----------
export const updateEmployeeBooking = createAction(
  '[Employee] Update EmployeeBooking',
  props<{ employee_id: number; booking: Booking }>()
);
export const updateEmployeeBookingSuccess = createAction(
  '[Employee] Update EmployeeBooking Success',
  props<{ res: any }>()
);
export const updateEmployeeBookingFailure = createAction(
  '[Employee] Update EmployeeBooking Failure',
  props<{ error: any }>()
);
// ------------ Delete Employee Booking ----------
export const deleteEmployeeBooking = createAction(
  '[Employee] Delete EmployeeBooking',
  props<{ employee_id: number; booking_id: number }>()
);
export const deleteEmployeeBookingSuccess = createAction(
  '[Employee] Delete EmployeeBooking Success',
  props<{ message: string }>()
);
export const deleteEmployeeBookingFailure = createAction(
  '[Employee] Delete EmployeeBooking Failure',
  props<{ error: any }>()
);
// ------------ Load Absence ----------
export const loadAbsence = createAction(
  '[Employee] Load Absence',
  props<{ employee_id: number; absence_id: number }>()
);
export const loadAbsenceSuccess = createAction(
  '[Employee] Load Absence Success',
  props<{ absence: AbsenceResource }>()
);

export const loadAbsenceFailure = createAction(
  '[Employee] Load Absence Failure',
  props<{ error: any }>()
);
// ------------ Add Employee Absence ----------
export const addEmployeeAbsence = createAction(
  '[Employee] Add EmployeeAbsence',
  props<{ employee_id: number; absence: Absence }>()
);
export const addEmployeeAbsenceSuccess = createAction(
  '[Employee] Add EmployeeAbsence Success',
  props<{ res: any }>()
);
export const addEmployeeAbsenceFailure = createAction(
  '[Employee] Add EmployeeAbsence Failure',
  props<{ error: any }>()
);
// ------------ Update Employee Absence ----------
export const updateEmployeeAbsence = createAction(
  '[Employee] Update EmployeeAbsence',
  props<{ employee_id: number; absence: Absence }>()
);
export const updateEmployeeAbsenceSuccess = createAction(
  '[Employee] Update EmployeeAbsence Success',
  props<{ res: any }>()
);
export const updateEmployeeAbsenceFailure = createAction(
  '[Employee] Update EmployeeAbsence Failure',
  props<{ error: any }>()
);
// ------------ Delete Employee Absence ----------
export const deleteEmployeeAbsence = createAction(
  '[Employee] Delete EmployeeAbsence',
  props<{ employee_id: number; absence_id: number }>()
);
export const deleteEmployeeAbsenceSuccess = createAction(
  '[Employee] Delete EmployeeAbsence Success',
  props<{ message: string }>()
);
export const deleteEmployeeAbsenceFailure = createAction(
  '[Employee] Delete EmployeeAbsence Failure',
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
// ------------ Employee Requests----------
export const initEmployeeRequests = createAction(
  '[Employee] Init Employee Requests',
  props<{ employee_id: number }>()
);
export const loadEmployeeRequests = createAction(
  '[Employee] Load Employee Requests',
  props<{ employee_id: number; display: DisplayRequestsCollection }>()
);
export const loadEmployeeRequestsSuccess = createAction(
  '[Employee] Load Employee Requests Success',
  props<{ requests: RequestCollection }>()
);

export const loadEmployeeRequestsFailure = createAction(
  '[Employee] Load Employee Requests Failure',
  props<{ error: any }>()
);
// ------------ Employee Supervised Requests----------
export const initEmployeeSupervisedRequests = createAction(
  '[Employee] Init Employee SupervisedRequests',
  props<{ employee_id: number }>()
);
export const loadEmployeeSupervisedRequests = createAction(
  '[Employee] Load Employee SupervisedRequests',
  props<{ employee_id: number; display: DisplayRequestsCollection }>()
);
export const loadEmployeeSupervisedRequestsSuccess = createAction(
  '[Employee] Load Employee SupervisedRequests Success',
  props<{ requests: RequestCollection }>()
);

export const loadEmployeeSupervisedRequestsFailure = createAction(
  '[Employee] Load Employee SupervisedRequests Failure',
  props<{ error: any }>()
);
// ------------ Add Request ----------
export const addRequest = createAction(
  '[Employee] Add Request',
  props<{ employee_id: number; request: any }>()
);
export const addRequestSuccess = createAction(
  '[Employee] Add Request Success',
  props<{ res: any }>()
);
export const addRequestFailure = createAction(
  '[Employee] Add Request Failure',
  props<{ error: any }>()
);
// ------------ Update Request ----------
export const updateRequest = createAction(
  '[Employee] Update Request',
  props<{ employee_id: number; request: Request }>()
);
export const updateRequestSuccess = createAction(
  '[Employee] Update Request Success',
  props<{ res: any }>()
);
export const updateRequestFailure = createAction(
  '[Employee] Update Request Failure',
  props<{ error: any }>()
);
// ------------ Delete Request ----------
export const deleteRequest = createAction(
  '[Employee] Delete Request',
  props<{ employee_id: number; request_id: number }>()
);
export const deleteRequestSuccess = createAction(
  '[Employee] Delete Request Success',
  props<{ message: string }>()
);
export const deleteRequestFailure = createAction(
  '[Employee] Delete Request Failure',
  props<{ error: any }>()
);
