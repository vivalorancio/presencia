import { ActionReducerMap } from '@ngrx/store';

import * as authentication from './views/authentication/reducers';
import * as employees from './views/employee/reducers';
// import * as home from './views/home/reducers';
// import * as activities from './views/activities/reducers';

export interface AppState {
  authentication: authentication.AuthenticationState;
  employees: employees.EmployeesState;
  // home: home.HomeState;
  // activities: activities.ActivitiesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authentication: authentication.authenticationReducer,
  employees: employees.employeesReducer,
  // home: home.homeReducer,
  // activities: activities.activitiesReducer,
};
