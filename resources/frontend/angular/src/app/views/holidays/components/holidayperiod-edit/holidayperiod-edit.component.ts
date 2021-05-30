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
  HolidayPeriod,
  HolidayPeriodCollection,
} from 'src/app/shared/models/holidays.model';

import * as holidaysActions from '../../../holidays/actions';

const rangeValidator: any = (fg: FormGroup) => {
  let invalid = false;
  const days = fg.get('days')?.value;
  const from = fg.get('date_from')?.value;
  const to = fg.get('date_to')?.value;
  if (!from || !to) invalid = true;
  if (from && to) {
    let fromdate = new Date(from).valueOf();
    let todate = new Date(to).valueOf();

    let ddate = new Date(from);
    ddate.setDate(ddate.getDate() + days);

    let totaldate = new Date(ddate).valueOf();

    invalid = fromdate > todate || totaldate > todate;
  }
  if (invalid) {
    fg.get('date_from')?.setErrors({ notvalid: true });
    fg.get('date_to')?.setErrors({ notvalid: true });
  } else {
    fg.get('date_from')?.updateValueAndValidity({ onlySelf: true });
    fg.get('date_to')?.updateValueAndValidity({ onlySelf: true });
  }
  fg.get('days')?.updateValueAndValidity({ onlySelf: true });
  return null;
};

@Component({
  selector: 'app-holidayperiod-edit',
  templateUrl: './holidayperiod-edit.component.html',
  styleUrls: ['./holidayperiod-edit.component.css'],
})
export class HolidayperiodEditComponent implements OnInit {
  holidayperiodForm!: FormGroup;
  holidayperiods!: HolidayPeriodCollection;
  holidayperiod: HolidayPeriod = {} as HolidayPeriod;
  pending: boolean = false;
  submiterror: any;

  submitted: boolean = false;
  showDeleteConfirmation = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('holidayperiods').subscribe((holidayperiods) => {
      this.holidayperiods = holidayperiods.holidayperiods;
      this.pending = holidayperiods.pending;
      this.submiterror = holidayperiods.error;
    });

    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_holidayperiod: any = (this.holidayperiods?.data.find(
        (holidayperiod: any) => holidayperiod.id === id
      ) || {}) as HolidayPeriod;
      if (the_holidayperiod !== {}) {
        this.holidayperiod = the_holidayperiod;
      }
    });

    this.submitted = false;

    this.holidayperiodForm = this.formBuilder.group(
      {
        code: [
          this.holidayperiod.code,
          [Validators.required, Validators.maxLength(3)],
        ],
        description: [
          this.holidayperiod.description,
          [Validators.required, , Validators.min(1)],
        ],
        days: [
          this.holidayperiod.days,
          [Validators.required, Validators.maxLength(50)],
        ],
        date_from: [this.holidayperiod.date_from, Validators.required],
        date_to: [this.holidayperiod.date_to, Validators.required],
      },
      { validator: rangeValidator }
    );
  }

  askDelete() {
    this.showDeleteConfirmation = true;
    return;
  }

  actionDelete(proceed: boolean) {
    this.showDeleteConfirmation = false;
    if (proceed)
      this.store.dispatch(
        holidaysActions.deleteHolidayPeriod({ id: this.holidayperiod.id })
      );
  }
  onSubmit() {
    this.submitted = true;
    let holidayperiodToSave = {
      ...this.holidayperiodForm.value,
    };
    holidayperiodToSave.code = holidayperiodToSave.code.toUpperCase();

    if (this.holidayperiod.id == null) {
      this.store.dispatch(
        holidaysActions.addHolidayPeriod({
          holidayperiod: holidayperiodToSave,
        })
      );
    } else {
      holidayperiodToSave = {
        id: this.holidayperiod.id,
        ...holidayperiodToSave,
      };
      this.store.dispatch(
        holidaysActions.updateHolidayPeriod({
          holidayperiod: holidayperiodToSave,
        })
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
      return label + ' has to be at least 1';
    } else if (fc.hasError('notvalid')) {
      return 'Invalid date range';
    } else if (fc.hasError('submiterror')) {
      return fc.getError('submiterror');
    }
  }

  getSubmitErrorDescription(): string {
    let error: string = '';
    if (this.submitted && this.submiterror?.error) {
      Object.entries(this.submiterror.error.errors).forEach((item: any) => {
        item[1].forEach((err: string) => (error += err + ' '));
      });
    }
    return error;
  }

  acceptError() {
    this.submitted = false;
  }
}
