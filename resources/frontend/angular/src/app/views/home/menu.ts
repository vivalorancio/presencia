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
