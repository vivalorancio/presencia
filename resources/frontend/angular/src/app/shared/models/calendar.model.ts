export interface Calendar {
  id: number;
  name: string;
  year: number;
}

export interface CalendarResource {
  data: Calendar;
}

export interface CalendarCollection {
  data: Calendar[];
  links: any;
  meta: any;
}

export interface CalendarShift {
  id: number;
  calendar_id: number;
  dayofyear: number;
  shift_id: number;
}

export interface CalendarShiftResource {
  data: CalendarShift;
}

export interface CalendarShiftCollection {
  data: CalendarShift[];
  links: any;
  meta: any;
}
