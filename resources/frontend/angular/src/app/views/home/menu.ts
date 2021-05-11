import { Store } from '@ngrx/store';

import * as employeesActions from '../../views/employee/actions';
import * as shiftsActions from '../../views/shift/actions';
import * as calendarsActions from '../../views/calendar/actions';

export interface MenuItem {
  label: string;
  link: string;
  items: MenuItem[] | null;
  open: boolean;
}

export const dashboardMenu: MenuItem[] = [];

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

export function initManagementStore(store: Store, link: string): void {
  switch (link) {
    case 'employees':
      store.dispatch(employeesActions.initEmployees());
      break;
    case 'shifts':
      store.dispatch(shiftsActions.initShifts());
      break;
    case 'calendars':
      break;
    case 'incidences':
      break;
    case 'incidencesgroups':
      break;
    case 'departments':
      break;
    case 'areas':
      break;
    case 'sections':
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
