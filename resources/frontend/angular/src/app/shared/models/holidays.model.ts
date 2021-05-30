export interface HolidayPeriod {
  id: number;
  code: string;
  description: string;
  days: number;
  date_from: string;
  date_to: string;
}

export interface HolidayPeriodResource {
  data: HolidayPeriod;
}

export interface HolidayPeriodCollection {
  data: HolidayPeriod[];
  links: any;
  meta: any;
}

export interface HolidayPeriodSearch {
  code: string;
  description: string;
}
