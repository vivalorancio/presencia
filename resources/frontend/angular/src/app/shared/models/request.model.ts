import { Employee } from './employee.model';

export interface Request {
  id: number;
  type: string;
  status: string;
  comments?: string;
  requested_at: string;
  updated_at: string;
  employee: Employee;
  validator: Employee;
  validated_at: string;
}

export interface BookingRequest extends Request {
  date: string;
  time: string;
  incidence_id?: number;
}

export interface AbsenceRequest extends Request {
  date_from: string;
  date_to: string;
  incidence_id: number;
}

export interface HolidayRequest extends Request {
  date_from: string;
  date_to: string;
  employee_holiday_period_id: number;
}

export interface RequestResource {
  data: Request;
}

export interface RequestCollection {
  data: Request[];
  links: any;
  meta: any;
}
