import { ActionReducerMap } from '@ngrx/store';

import * as authentication from './views/authentication/reducers';
import * as employees from './views/employee/reducers';
import * as shifts from './views/shift/reducers';
import * as incidences from './views/incidence/reducers';
import * as holidays from './views/holidays/reducers';
import * as organization from './views/organization/reducers';
import * as calendars from './views/calendar/reducers';

export interface AppState {
  authentication: authentication.AuthenticationState;
  employee: employees.EmployeeState;
  employees: employees.EmployeesState;
  booking: employees.BookingState;
  absence: employees.AbsenceState;
  bookings: employees.BookingsState;
  request: employees.RequestState;
  requests: employees.RequestsState;
  employeecalendars: employees.EmployeeCalendarsState;
  employeeholidayperiods: employees.EmployeeHolidayPeriodsState;
  employeeholidays: employees.EmployeeHolidaysState;
  shifts: shifts.ShiftsState;
  calendars: calendars.CalendarsState;
  calendarshifts: calendars.CalendarShiftsState;
  incidences: incidences.IncidencesState;
  incidencesgroups: incidences.IncidencesGroupsState;
  incidencesgroupincidences: incidences.IncidencesGroupIncidencesState;
  departments: organization.DepartmentsState;
  areas: organization.AreasState;
  sections: organization.SectionsState;
  supervisiongroups: organization.SupervisionGroupsState;
  supervisiongroupsupervisors: organization.SupervisionGroupSupervisorsState;
  holidayperiods: holidays.HolidayPeriodsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authentication: authentication.authenticationReducer,
  employee: employees.employeeReducer,
  employees: employees.employeesReducer,
  booking: employees.bookingReducer,
  absence: employees.absenceReducer,
  bookings: employees.bookingsReducer,
  request: employees.requestReducer,
  requests: employees.requestsReducer,
  employeecalendars: employees.employeecalendarsReducer,
  employeeholidayperiods: employees.employeeholidayperiodsReducer,
  employeeholidays: employees.employeeholidaysReducer,
  shifts: shifts.shiftsReducer,
  calendars: calendars.calendarsReducer,
  calendarshifts: calendars.calendarshiftsReducer,
  incidences: incidences.incidencesReducer,
  incidencesgroups: incidences.incidencesgroupsReducer,
  incidencesgroupincidences: incidences.incidencesgroupincidencesReducer,
  departments: organization.departmentsReducer,
  areas: organization.areasReducer,
  sections: organization.sectionsReducer,
  supervisiongroups: organization.supervisiongroupsReducer,
  supervisiongroupsupervisors: organization.supervisiongroupsupervisorsReducer,
  holidayperiods: holidays.holidayperiodsReducer,
};
