import { ActionReducerMap } from '@ngrx/store';

import * as authentication from './views/authentication/reducers';
import * as employees from './views/employee/reducers';
import * as shifts from './views/shift/reducers';
import * as incidences from './views/incidence/reducers';
import * as organization from './views/organization/reducers';
import * as calendars from './views/calendar/reducers';

export interface AppState {
  authentication: authentication.AuthenticationState;
  employees: employees.EmployeesState;
  employeecalendars: employees.EmployeeCalendarsState;
  shifts: shifts.ShiftsState;
  calendars: calendars.CalendarsState;
  calendarshifts: calendars.CalendarShiftsState;
  incidences: incidences.IncidencesState;
  incidencesgroups: incidences.IncidencesGroupsState;
  incidencesgroupincidences: incidences.IncidencesGroupIncidencesState;
  departments: organization.DepartmentsState;
  areas: organization.AreasState;
  sections: organization.SectionsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authentication: authentication.authenticationReducer,
  employees: employees.employeesReducer,
  employeecalendars: employees.employeecalendarsReducer,
  shifts: shifts.shiftsReducer,
  calendars: calendars.calendarsReducer,
  calendarshifts: calendars.calendarshiftsReducer,
  incidences: incidences.incidencesReducer,
  incidencesgroups: incidences.incidencesgroupsReducer,
  incidencesgroupincidences: incidences.incidencesgroupincidencesReducer,
  departments: organization.departmentsReducer,
  areas: organization.areasReducer,
  sections: organization.sectionsReducer,
};
