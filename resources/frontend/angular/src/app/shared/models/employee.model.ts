import { IncidencesGroup } from './incidence.model';
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
  is_manager: boolean;
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
