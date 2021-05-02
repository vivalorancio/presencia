import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import {
  Calendar,
  CalendarCollection,
} from 'src/app/shared/models/calendar.model';
import * as calendarsActions from '../../../calendar/actions';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css'],
})
export class CalendarEditComponent implements OnInit {
  calendarForm!: FormGroup;
  calendars!: CalendarCollection;
  calendar: Calendar = {} as Calendar;
  pending: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('calendars').subscribe((calendars) => {
      this.calendars = calendars.calendars;
      this.pending = calendars.pending;
    });

    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_calendar: any = (this.calendars?.data.find(
        (calendar: any) => calendar.id === id
      ) || {}) as Calendar;
      if (the_calendar !== {}) {
        this.calendar = the_calendar;
      }
    });

    this.calendarForm = this.formBuilder.group({
      year: [
        {
          value: this.calendar.year
            ? this.calendar.year
            : new Date().getFullYear(),
          disabled: this.calendar.year != null,
        },
        [Validators.required, Validators.min(1900), Validators.max(2999)],
      ],
      name: [
        this.calendar.name,
        [Validators.required, Validators.maxLength(50)],
      ],
    });
  }

  onSubmit() {
    if (this.calendar.id == null) {
      this.store.dispatch(
        calendarsActions.addCalendar({ calendar: this.calendarForm.value })
      );
    } else {
      let calendarToSave = {
        id: this.calendar.id,
        ...this.calendarForm.value,
      };
      this.store.dispatch(
        calendarsActions.updateCalendar({ calendar: calendarToSave })
      );
    }
  }

  getControlErrorMessage(fca: AbstractControl | null, label: string) {
    let fc = fca as AbstractControl;
    if (fc.hasError('required')) {
      return label + ' is required';
    } else if (fc.hasError('maxlength')) {
      return label + ' too long';
    } else if (fc.hasError('min')) {
      return label + ' has to be at least 1900';
    } else if (fc.hasError('max')) {
      return label + ' has to be less than 2999';
    } else if (fc.hasError('submiterror')) {
      return fc.getError('submiterror');
    }
  }
}
