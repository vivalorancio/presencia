import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CalendarSelectionClick,
  ClickModifier,
  GetClickModifier,
} from '../../models/click-modifier.enum';
import { Day } from '../../models/day.model';
import { Month } from '../../models/month.model';
import { Week } from '../../models/week.model';
import { Year } from '../../models/year.model';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.css'],
})
export class CalendarMonthComponent implements OnInit {
  private _month?: Month;
  @Input()
  get month(): Month {
    return this._month as Month;
  }
  set month(month: Month) {
    this._month = month;
  }

  private _year?: Year;
  @Input()
  get year(): Year {
    return this._year as Year;
  }
  set year(year: Year) {
    this._year = year;
  }

  @Output() daySelected = new EventEmitter<CalendarSelectionClick>();

  constructor() {}

  ngOnInit(): void {}

  selectDay(event: MouseEvent, day: Day) {
    let calendarSelectionclick: CalendarSelectionClick = {
      days: [day.dayOfYear],
      click: GetClickModifier(event),
    };
    this.daySelected.emit(calendarSelectionclick);
  }

  selectMonth(event: MouseEvent, month: Month) {
    let clickmodifier = GetClickModifier(event);
    if (
      clickmodifier == ClickModifier.ShiftClick ||
      clickmodifier == ClickModifier.ShiftControlClick
    )
      return;

    let calendarSelectionclick: CalendarSelectionClick = {
      days: [],
      click: GetClickModifier(event),
    };
    for (let i = 0; i < month.days.length; i++) {
      calendarSelectionclick.days = [
        ...calendarSelectionclick.days,
        month.days[i],
      ];
    }
    this.daySelected.emit(calendarSelectionclick);
  }

  selectDayOfWeek(event: MouseEvent, month: Month, index: number) {
    let clickmodifier = GetClickModifier(event);
    if (
      clickmodifier == ClickModifier.ShiftClick ||
      clickmodifier == ClickModifier.ShiftControlClick
    )
      return;
    let calendarSelectionclick: CalendarSelectionClick = {
      days: [],
      click: GetClickModifier(event),
    };

    for (let i = 0; i < month.weeks.length; i++) {
      if (month.weeks[i].days[index] >= 0) {
        calendarSelectionclick.days = [
          ...calendarSelectionclick.days,
          month.weeks[i].days[index],
        ];
      }
    }
    this.daySelected.emit(calendarSelectionclick);
  }

  selectWeek(event: MouseEvent, week: Week) {
    let clickmodifier = GetClickModifier(event);
    if (
      clickmodifier == ClickModifier.ShiftClick ||
      clickmodifier == ClickModifier.ShiftControlClick
    )
      return;
    let calendarSelectionclick: CalendarSelectionClick = {
      days: [],
      click: GetClickModifier(event),
    };

    for (let i = 0; i < week.days.length; i++) {
      if (week.days[i] >= 0) {
        calendarSelectionclick.days = [
          ...calendarSelectionclick.days,
          week.days[i],
        ];
      }
    }
    this.daySelected.emit(calendarSelectionclick);
  }
}
