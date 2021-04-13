export interface Shift {
  id: number;
  code: string;
  description: string;
  colour: string;
  start_time: string;
  end_time: string;
  expected_time: string;
  recess_time: string;
  is_holiday: boolean;
}

export interface ShiftResource {
  data: Shift;
}

export interface ShiftCollection {
  data: Shift[];
  links: any;
  meta: any;
}
