import { CalendarDayData } from './calendar-data.model';

export class Day {
  day?: Date;
  dayOfYear: number;
  year?: number;
  month?: number;
  selected?: boolean = false;
  data?: CalendarDayData;

  constructor() {
    this.dayOfYear = -1;
  }
}
