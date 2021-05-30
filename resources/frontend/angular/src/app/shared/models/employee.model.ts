import { HolidayPeriod } from './holidays.model';
import { IncidencesGroup } from './incidence.model';
import {
  Area,
  Department,
  Section,
  SupervisionGroup,
} from './organization.model';
import { Shift } from './shift.model';
import { User } from './user.model';
export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  code: string;
  national_id: string;
  email: string;
  start_date: string;
  end_date: string;
  incidences_group_id: number;
  incidences_group: IncidencesGroup;
  supervision_group_id: number;
  default_shift: Shift;
  department: Department;
  area: Area;
  section: Section;
  supervision_group: SupervisionGroup;
  is_supervisor: boolean;
  user: User;
}

export interface EmployeeResource {
  data: Employee;
}

export interface EmployeeCollection {
  data: Employee[];
  links: any;
  meta: any;
}

export interface EmployeeSearch {
  name: string;
  code: string;
  national_id: string;
  email: string;
  validity: string;
  department: string;
  area: string;
  section: string;
  supervision_group: string;
}
export interface EmployeeCalendar {
  id: number;
  year: number;
  employee_id: number;
  calendar_id: number;
}

export interface EmployeeCalendarResource {
  data: EmployeeCalendar;
}

export interface EmployeeCalendarCollection {
  data: EmployeeCalendar[];
  links: any;
  meta: any;
}

export interface EmployeeHolidayPeriod {
  id: number;
  employee_id: number;
  holiday_period_id: number;
  holiday_period: HolidayPeriod;
  assigned: number;
}

export interface EmployeeHolidayPeriodResource {
  data: EmployeeHolidayPeriod;
}

export interface EmployeeHolidayPeriodCollection {
  data: EmployeeHolidayPeriod[];
  links: any;
  meta: any;
}

export interface EmployeeHoliday {
  id: number;
  day: string;
  employee_holiday_period_id: number;
  employee_holiday_period: EmployeeHolidayPeriod;
}

export interface EmployeeHolidayResource {
  data: EmployeeHoliday;
}

export interface EmployeeHolidayCollection {
  data: EmployeeHoliday[];
  links: any;
  meta: any;
}
