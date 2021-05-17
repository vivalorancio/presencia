import { Store } from '@ngrx/store';

import * as authenticationActions from '../../views/authentication/actions';

import * as employeesActions from '../../views/employee/actions';
import * as shiftsActions from '../../views/shift/actions';
import * as calendarsActions from '../../views/calendar/actions';
import * as incidencesActions from '../../views/incidence/actions';
import * as organizationActions from '../../views/organization/actions';

export interface MenuItem {
  label: string;
  link: string;
  items: MenuItem[] | null;
  open: boolean;
}

export const dashboardMenu: MenuItem[] = [
  { label: 'Bookings', link: 'bookings' } as MenuItem,
];

export const managementMenu: MenuItem[] = [
  { label: 'Employees', link: 'employees' } as MenuItem,
  {
    label: 'Time',
    items: [
      { label: 'Shifts', link: 'shifts' } as MenuItem,
      { label: 'Calendars', link: 'calendars' } as MenuItem,
      { label: 'Incidences', link: 'incidences' } as MenuItem,
      {
        label: 'Incidences Groups',
        link: 'incidencesgroups',
      } as MenuItem,
    ],
    open: false,
  } as MenuItem,
  {
    label: 'Organization',
    items: [
      { label: 'Departments', link: 'departments' } as MenuItem,
      { label: 'Areas', link: 'areas' } as MenuItem,
      { label: 'Sections', link: 'sections' } as MenuItem,
      { label: 'Supervision Groups', link: 'supervisiongroups' } as MenuItem,
    ],
    open: false,
  } as MenuItem,
  { label: 'Holidays', link: 'holidays' } as MenuItem,
  { label: 'Bookings', link: 'bookings' } as MenuItem,
];

export function initDashboardStore(
  store: Store,
  link: string,
  employee_id: number
): void {
  switch (link) {
    case 'bookings':
      store.dispatch(employeesActions.initEmployeeBookings({ employee_id }));
      break;
    default:
      break;
  }
}

export function initManagementStore(store: Store, link: string): void {
  switch (link) {
    case 'employees':
      store.dispatch(employeesActions.initEmployees());
      break;
    case 'shifts':
      store.dispatch(shiftsActions.initShifts());
      break;
    case 'calendars':
      store.dispatch(calendarsActions.initCalendars());
      break;
    case 'incidences':
      store.dispatch(incidencesActions.initIncidences());
      break;
    case 'incidencesgroups':
      store.dispatch(incidencesActions.initIncidencesGroups());
      break;
    case 'departments':
      store.dispatch(organizationActions.initDepartments());
      break;
    case 'areas':
      store.dispatch(organizationActions.initAreas());
      break;
    case 'sections':
      store.dispatch(organizationActions.initSections());
      break;
    case 'supervisiongroups':
      break;
    case 'holidays':
      break;
    case 'bookings':
      break;
    default:
      break;
  }
}
