import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { dayOfYear } from '../../calendar';
import { CalendarYearData } from '../../models/calendar-data.model';
import {
  CalendarSelectionClick,
  ClickModifier,
} from '../../models/click-modifier.enum';
import { Year } from '../../models/year.model';

const rangeValidator: any = (fg: FormGroup) => {
  let invalid = false;
  const from = fg.get('range_from')?.value;
  const to = fg.get('range_to')?.value;
  if (!from || !to) invalid = true;
  if (from && to) {
    invalid = new Date(from).valueOf() > new Date(to).valueOf();
  }
  if (invalid) {
    fg.get('range_from')?.setErrors({ notvalid: true });
    fg.get('range_to')?.setErrors({ notvalid: true });
  } else {
    fg.get('range_from')?.updateValueAndValidity({ onlySelf: true });
    fg.get('range_to')?.updateValueAndValidity({ onlySelf: true });
  }
  return null;
};

@Component({
  selector: 'app-calendar-year',
  templateUrl: './calendar-year.component.html',
  styleUrls: ['./calendar-year.component.css'],
})
export class CalendarYearComponent implements OnInit, DoCheck {
  private _year?: Year;
  get year(): Year {
    return this._year as Year;
  }

  emitSelected() {
    this.selectionChange.emit(this.selection);
  }

  private theCalendarData: CalendarYearData = { year: -1, days: [] };
  private initialData: string = '';

  @Input()
  set calendarData(calendardata: CalendarYearData) {
    this.theCalendarData = calendardata;
    this.initData(calendardata);
  }

  selection: { year: number; day: number }[] = [];
  private initialSelection: string = '';

  @Input('selection') set _initSelection(sel: { year: number; day: number }[]) {
    this.selection = sel;
    this.initSelection(sel);
  }

  @Output() selectionChange = new EventEmitter<
    { year: number; day: number }[]
  >();

  rangeForm!: FormGroup;

  @Input() pending: boolean = true;

  @Input() showSelectionControls: boolean = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.rangeForm = this.formBuilder.group(
      {
        range_from: [],
        range_to: [],
      },
      { validator: rangeValidator }
    );
  }

  ngDoCheck(): void {
    let stringData = JSON.stringify(this.theCalendarData);
    if (this.initialData !== stringData) {
      this.initData(this.theCalendarData);
    }
    let stringSelection = JSON.stringify(this.selection);
    if (this.initialSelection !== stringSelection) {
      this.initSelection(this.selection);
    }
  }

  initData(calendardata: CalendarYearData) {
    this.initialData = JSON.stringify(this.theCalendarData);
    this._year = new Year(calendardata.year);
    for (const calendardaydata of calendardata.days) {
      if (calendardaydata.day < this.year.days.length) {
        this.year.days[calendardaydata.day].data = calendardaydata;
      }
    }
    this.refreshSelected();
    // console.log(this.year);
  }

  initSelection(sel: { year: number; day: number }[]) {
    this.initialSelection = JSON.stringify(this.selection);
    for (const day of this.year.days) {
      day.selected = false;
    }
    this.refreshSelected();
  }

  refreshSelected() {
    for (let i = 0; i < this.selection.length; i++) {
      if (this.selection[i].year == this.year.year)
        this.year.days[this.selection[i].day].selected = true;
    }
    this.emitSelected();
  }

  // Selection Events
  selectDay(calendarSelectionclick: CalendarSelectionClick) {
    switch (calendarSelectionclick.click) {
      case ClickModifier.ShiftControlClick:
        break;
      case ClickModifier.ShiftClick:
        this.shiftTo(calendarSelectionclick.days);
        break;
      case ClickModifier.ControlClick:
        this.toggle(calendarSelectionclick.days);
        break;
      case ClickModifier.Click:
        this.select(calendarSelectionclick.days);
        break;
    }
    this.emitSelected();
  }

  //Queries
  sameSelection(days: number[]) {
    return this.selection.length === days.length && this.alreadySelected(days);
  }

  alreadySelected(days: number[]) {
    return days.every((day) =>
      this.selection.some(
        (selectedDay) =>
          selectedDay.day === day && this.year.year === selectedDay.year
      )
    );
  }

  latestSelectedDay() {
    return this.selection.reduce(
      (acc, selected) =>
        selected.year === this.year.year && selected.day > acc
          ? selected.day
          : acc,
      -1
    );
  }

  earliestSelectedDay() {
    return this.selection.reduce(
      (acc, selected) =>
        selected.year === this.year.year && selected.day < acc
          ? selected.day
          : acc,
      367
    );
  }

  //Selection Actions -  day

  addOne(day: number) {
    if (
      this.selection.find(
        (aday) => aday.year === this.year.year && aday.day === day
      )
    )
      return;

    this.selection = [...this.selection, { year: this.year.year, day }];
    this.year.days[day].selected = true;
  }

  deleteOne(day: number) {
    this.selection = this.selection.filter(
      (aday) => aday.year !== this.year.year || aday.day !== day
    );

    this.year.days[day].selected = false;
  }

  //Selection Actions -  day[]
  clear() {
    for (const day of this.year.days) {
      day.selected = false;
    }
    this.selection = [];
  }

  select(days: number[]) {
    let sameSelection = this.sameSelection(days);
    this.clear();
    if (sameSelection) {
      return;
    }
    for (const day of days) this.addOne(day);
  }

  toggle(days: number[]) {
    if (this.alreadySelected(days)) {
      for (const day of days) this.deleteOne(day);
    } else {
      for (const day of days) this.addOne(day);
    }
  }

  shiftTo(days: number[]) {
    if (this.selection.length == 0) {
      return this.select(days);
    }
    let first;
    let last;
    let eSD = this.earliestSelectedDay();
    let lSD = this.latestSelectedDay();
    let dstToE = Math.abs(days[0] - eSD);
    let dstToL = Math.abs(days[0] - lSD);

    if (days[0] < eSD) {
      first = days[0];
      last = eSD;
    } else if (days[0] > lSD) {
      first = lSD;
      last = days[0];
    } else {
      if (dstToE > dstToL) {
        first = days[0];
        last = lSD;
      } else {
        first = eSD;
        last = days[0];
      }
    }

    if (this.alreadySelected(days)) {
      for (let i = first; i <= last; i++) this.deleteOne(i);
    } else {
      for (let i = first; i <= last; i++) this.addOne(i);
    }
  }

  selectAll() {
    for (
      let i = 0;
      i <= this.year.days[this.year.days.length - 1].dayOfYear;
      i++
    )
      this.addOne(i);
    this.emitSelected();
  }

  clearAll() {
    this.clear();
    this.emitSelected();
  }

  selectMoFr() {
    this.clear();

    for (const month of this.year.months) {
      for (const week of month.weeks) {
        for (let i = 0; i < 5; i++) {
          if (week.days[i] >= 0) this.addOne(week.days[i]);
        }
      }
    }
    this.emitSelected();
  }

  selectSaSu() {
    this.clear();

    for (const month of this.year.months) {
      for (const week of month.weeks) {
        for (let i = 5; i < 7; i++) {
          if (week.days[i] >= 0) this.addOne(week.days[i]);
        }
      }
    }
    this.emitSelected();
  }

  selectRange() {
    let from = dayOfYear(new Date(this.rangeForm.value.range_from));
    let to = dayOfYear(new Date(this.rangeForm.value.range_to));

    this.clear();
    for (let i = from; i <= to; i++) {
      this.addOne(i);
    }
    this.emitSelected();
  }
}
