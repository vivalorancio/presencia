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
  supervision_group_id: number;
  shift_id: number;
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
