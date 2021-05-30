import { Incidence } from './incidence.model';
import { Shift } from './shift.model';

export interface Booking {
  id: number;
  //employee_id: number;
  date: string;
  time: string;
  incidence_id: number | null;
  incidence: Incidence;
  user_id: number | null;
}

export interface BookingResource {
  data: Booking;
}

export interface Absence {
  id: number;
  //employee_id: number;
  date: string;
  incidence_id: number | null;
  incidence: Incidence;
  user_id: number | null;
}

export interface AbsenceResource {
  data: Absence;
}

export interface DayBookings {
  day: string;
  shift: Shift[];
  bookings: Booking[];
  absences: Absence[];
  eval: DayBookingsEval;
}

export interface DayBookingsEval {
  count: number;
  anomalies: string[];
  diffs: string[];
  offtimes: boolean[];
  totalbookedtime: string;
  totalshifttime: string;
  balance: string;
  negbalance: boolean;
  arrivedifftime: string;
  leavedifftime: string;
}

export interface DayBookingsResource {
  data: DayBookings;
}

export interface DayBookingsCollection {
  data: DayBookings[];
  links: any;
  meta: any;
}
