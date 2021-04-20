import { Day } from './day.model';

export class Week {
  index: number;
  days: number[];

  constructor() {
    this.index = -1;
    this.days = [];
    for (let i = 0; i < 7; i++) {
      this.days.push(-1);
    }
  }

  add(day: Day): void {
    this.days[((day.day as Date).getDay() + 6) % 7] = day.dayOfYear;
  }
}
