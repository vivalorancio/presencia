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
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import {
  Employee,
  EmployeeCollection,
  EmployeeHoliday,
  EmployeeHolidayCollection,
  EmployeeHolidayPeriod,
  EmployeeHolidayPeriodCollection,
} from 'src/app/shared/models/employee.model';

import * as employeesActions from '../../actions';

const rangeValidator: any = (fg: FormGroup) => {
  let invalid = false;
  const from = fg.get('date_from')?.value;
  const to = fg.get('date_to')?.value;
  // if (!from || !to) invalid = true;
  if (from && to) {
    invalid = new Date(from).valueOf() > new Date(to).valueOf();
  }
  if (invalid) {
    fg.get('date_from')?.setErrors({ rangenotvalid: true });
    fg.get('date_to')?.setErrors({ rangenotvalid: true });
  } else {
    fg.get('date_from')?.updateValueAndValidity({ onlySelf: true });
    fg.get('date_to')?.updateValueAndValidity({ onlySelf: true });
  }
  return null;
};

@Component({
  selector: 'app-employeeholidays-edit',
  templateUrl: './employeeholidays-edit.component.html',
  styleUrls: ['./employeeholidays-edit.component.css'],
})
export class EmployeeholidaysEditComponent implements OnInit {
  employeeholidaysForm!: FormGroup;

  employeeholidays!: EmployeeHolidayCollection;
  pending: boolean = false;
  submiterror: any;

  employeeholidayperiods!: EmployeeHolidayPeriodCollection;
  pending_employeeholidayperiods: boolean = false;
  employeeholidayperiod: EmployeeHolidayPeriod = {} as EmployeeHolidayPeriod;
  employeeholidayperiod_id!: number;

  employees!: EmployeeCollection;
  pending_employees: boolean = false;
  employee: Employee = {} as Employee;
  employee_id!: number;

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('employeeholidays').subscribe((employeeholidays) => {
      this.employeeholidays = employeeholidays.employeeholidays;
      this.pending = employeeholidays.pending;
    });

    this.store
      .select('employeeholidayperiods')
      .subscribe((employeeholidayperiods) => {
        this.employeeholidayperiods =
          employeeholidayperiods.employeeholidayperiods;
        this.pending_employeeholidayperiods = employeeholidayperiods.pending;
        // this.submiterror = employeeholidayperiods.error;
      });

    this.store.select('employees').subscribe((employees) => {
      this.employees = employees.employees;
      this.pending_employees = employees.pending;
    });

    this.route.params.subscribe((params) => {
      this.employee_id = +params.employee_id;
      const the_employee: any = (this.employees?.data.find(
        (employee: any) => employee.id === this.employee_id
      ) || {}) as Employee;
      if (the_employee !== {}) {
        this.employee = the_employee;
      }

      this.employeeholidayperiod_id = +params.holidayperiod_id;
      const the_employeeholidayperiod: any =
        (this.employeeholidayperiods?.data.find(
          (employeeholidayperiod: EmployeeHolidayPeriod) =>
            employeeholidayperiod.id === this.employeeholidayperiod_id
        ) || {}) as EmployeeHolidayPeriod;
      if (the_employeeholidayperiod !== {}) {
        this.employeeholidayperiod = the_employeeholidayperiod;
      }

      this.store.dispatch(
        employeesActions.loadEmployeeHolidays({
          employee_id: this.employee_id,
          employeeholidayperiod_id: this.employeeholidayperiod_id,
          page: '1',
        })
      );

      this.submitted = false;

      this.employeeholidaysForm = this.formBuilder.group(
        {
          date_from: ['', [Validators.required]],
          date_to: ['', [Validators.required]],
        },
        { validator: rangeValidator }
      );
    });
  }

  ispending(): boolean {
    return (
      this.pending ||
      this.pending_employeeholidayperiods ||
      this.pending_employees
    );
  }

  nextDay(day: string): string {
    let ddate = new Date(day);
    ddate.setDate(ddate.getDate() + 1);
    return dateAAAAMMDD(ddate);
  }

  addHolidays() {
    this.submitted = true;

    let employeeholidays: EmployeeHoliday[] = [];
    let { date_from, date_to } = this.employeeholidaysForm.value;

    if (date_to === null) date_to = date_from;

    let aday = date_from;
    while (aday <= date_to) {
      employeeholidays.push({ day: aday } as EmployeeHoliday);
      aday = this.nextDay(aday);
    }

    this.store.dispatch(
      employeesActions.addEmployeeHoliday({
        employee_id: this.employee_id,
        employeeholidayperiod_id: this.employeeholidayperiod_id,
        employeeholidays,
      })
    );
  }

  removeHoliday(employeeholiday_id: number) {
    this.store.dispatch(
      employeesActions.deleteEmployeeHoliday({
        employee_id: this.employee_id,
        employeeholidayperiod_id: this.employeeholidayperiod_id,
        employeeholiday_id,
      })
    );
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

  getControlErrorMessage(fca: AbstractControl | null, label: string) {
    let fc = fca as AbstractControl;
    if (fc.hasError('required')) {
      return label + ' is required';
    } else if (fc.hasError('rangenotvalid')) {
      return 'Invalid date range';
    } else if (fc.hasError('submiterror')) {
      return fc.getError('submiterror');
    }
  }
}
