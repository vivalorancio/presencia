export interface CalendarDayData {
  day: number;
  label?: string;
  tooltip?: string;
  color?: string;
  textcolor?: string;
}

export interface CalendarYearData {
  year: number;
  days: CalendarDayData[];
}
