export interface CalendarDayData {
  day: number;
  label?: string;
  tooltip?: string;
  colour?: string;
  textcolour?: string;
}

export interface CalendarYearData {
  year: number;
  days: CalendarDayData[];
}
