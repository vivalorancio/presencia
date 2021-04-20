import { Day } from './day.model';
import { Month } from './month.model';

export class Year {
  year: number;
  months: Month[] = [];
  days: Day[] = [];

  constructor(y: number) {
    this.year = y;

    let dayOfYear = 0;
    let date = new Date(this.year, 0, 1);
    let dayofweek = (date.getDay() + 6) % 7;
    let weekOfYear = dayofweek < 3 ? 0 : 52;

    for (let i = 0; i < 12; i++) {
      let days: Day[] = this.getMonthDays(i, dayOfYear);
      let month = new Month();
      month.index = i;
      month.days = days.map((day) => day.dayOfYear);
      weekOfYear = this.arrangeWeeks(month, days, weekOfYear);
      dayOfYear = days[days.length - 1].dayOfYear + 1;
      this.days = [...this.days, ...days];
      this.months.push(month);
    }
  }

  getMonthDays(month: number, dayofyear: number): Day[] {
    let days: Day[] = [];
    let date = new Date(this.year, month, 1);

    while (date.getMonth() === month) {
      let day = new Day();
      day.day = new Date(date);
      day.month = month;
      day.year = this.year;
      day.dayOfYear = dayofyear++;
      days.push(day);
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  arrangeWeeks(month: Month, days: Day[], weekofyear: number) {
    let weekIndex = 0;
    for (let d of days) {
      month.weeks[weekIndex].index = ((weekofyear + weekIndex) % 53) + 1;
      month.weeks[weekIndex].add(d);

      if ((d.day as Date).getDay() === 0) {
        weekIndex++;
      }
    }
    return (weekofyear + weekIndex) % 53;
  }
}
