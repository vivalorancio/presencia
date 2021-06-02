import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import { ColourDropdownItem } from 'src/app/shared/colour-dropdown/colour-dropdown';
import {
  Employee,
  EmployeeHolidayPeriod,
  EmployeeHolidayPeriodCollection,
} from 'src/app/shared/models/employee.model';
import {
  HolidayRequest,
  RequestCollection,
} from 'src/app/shared/models/request.model';

import * as employeesActions from '../../actions';

@Component({
  selector: 'app-holidaysrequest-edit',
  templateUrl: './holidaysrequest-edit.component.html',
  styleUrls: ['./holidaysrequest-edit.component.css'],
})
export class HolidaysrequestEditComponent implements OnInit {
  holidayForm!: FormGroup;
  submiterror: any;
  pending: boolean = false;
  request_id!: number;

  is_supervised: boolean = false;

  submitted: boolean = false;
  showDeleteConfirmation = false;

  employee: Employee = {} as Employee;
  pending_employee: boolean = false;
  employeeholidayperiods!: EmployeeHolidayPeriodCollection;
  pending_employeeholidayperiods: boolean = false;

  requests!: RequestCollection;
  pending_requests: boolean = false;
  request!: any;

  selectedHolidayPeriodId: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngDestroyed$ = new Subject();

  public ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

  ngOnInit(): void {
    this.store
      .select('employee')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((employee) => {
        this.employee = employee.employee.data;
        //this.incidences = employee.incidences;
        this.pending_employee = employee.pending;

        if (!this.employee) {
          this.router.navigate(['/dashboard']);
        }
      });

    this.store
      .select('requests')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((requests) => {
        this.requests = requests.requests;
        this.pending_requests = requests.pending;
      });

    this.store
      .select('employeeholidayperiods')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((employeeholidayperiods) => {
        this.employeeholidayperiods =
          employeeholidayperiods.employeeholidayperiods;
        this.pending_employeeholidayperiods = employeeholidayperiods.pending;
      });

    //if (this.employeeholidayperiods.meta === null) {
    this.store.dispatch(
      employeesActions.loadEmployeeHolidayPeriods({
        employee_id: this.employee.id,
        page: '1',
      })
    );
    //}

    this.route.params.pipe(takeUntil(this.ngDestroyed$)).subscribe((params) => {
      this.request_id = +params.request_id;

      const the_request: any = (this.requests?.data.find(
        (holiday: any) => holiday.id === this.request_id
      ) || {}) as Request;

      if (the_request !== {}) {
        this.request = the_request;
      }
    });

    this.is_supervised =
      this.route.snapshot.url[0]?.path === 'supervisedrequests';

    this.holidayForm = this.formBuilder.group(
      {
        date_from: [
          {
            value: this.request.holiday?.date_from || '',
            disabled: this.request.id,
          },
          Validators.required,
        ],
        date_to: [
          {
            value: this.request.holiday?.date_to || '',
            disabled: this.request.id,
          },
          Validators.required,
        ],
        comments: [
          {
            value: this.request.comments,
            disabled: this.request.id,
          },
        ],
        validator_comments: [
          {
            value: this.request.validator_comments,
            disabled:
              !this.is_supervised ||
              (this.is_supervised && this.request.status !== 'pending'),
          },
        ],
      },
      { validator: this.rangeValidator }
    );

    this.selectedHolidayPeriodId =
      this.request.holiday?.employee_holiday_period_id || -1;

    this.store
      .select('request')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((request) => {
        this.pending = request.pending;
        this.submiterror = request.error;
      });
  }

  rangeValidator(fg: AbstractControl): ValidationErrors | null {
    let invalid = false;
    const from = fg.get('date_from')?.value;
    const to = fg.get('date_to')?.value;
    if (!from || !to) invalid = true;
    if (from && to) {
      invalid = new Date(from).valueOf() > new Date(to).valueOf();
    }
    if (invalid) {
      fg.get('date_from')?.setErrors({ notvalid: true });
      fg.get('date_to')?.setErrors({ notvalid: true });
    } else {
      fg.get('date_from')?.updateValueAndValidity({ onlySelf: true });
      fg.get('date_to')?.updateValueAndValidity({ onlySelf: true });
    }
    return null;
  }

  ispending() {
    return (
      this.pending ||
      this.pending_employee ||
      this.pending_requests ||
      this.pending_employeeholidayperiods
    );
  }

  getColourItemsArray(items: EmployeeHolidayPeriod[]): ColourDropdownItem[] {
    return items.map((item: EmployeeHolidayPeriod) => {
      return {
        id: item.id,
        code: '' + item.holiday_period.code,
        description: item.holiday_period.description,
        colour: 'bg-gray-300',
      };
    });
  }

  getSelectedEmployeeHolidayPeriod() {
    if (this.request.id) {
      return this.request.holiday.employee_holiday_period;
    } else {
      return (
        this.employeeholidayperiods.data.find(
          (item) => item.id === this.selectedHolidayPeriodId
        ) || ({} as EmployeeHolidayPeriod)
      );
    }
  }

  getAvaliableDays(): number {
    return (
      this.getSelectedEmployeeHolidayPeriod()?.holiday_period?.days -
      this.getSelectedEmployeeHolidayPeriod()?.assigned
    );
  }

  askDelete() {
    this.showDeleteConfirmation = true;
    return;
  }

  actionDelete(proceed: boolean) {
    this.showDeleteConfirmation = false;
    if (proceed) {
      this.store.dispatch(
        employeesActions.deleteRequest({
          employee_id: this.employee.id,
          request_id: this.request.id,
        })
      );
    }
  }

  process(status: string) {
    console.log(this.holidayForm.value);

    let holidayrequestToSave = {
      ...this.holidayForm.value,
      status: status,
      validator_id: this.employee.id,
      id: this.request.id,
    } as HolidayRequest;
    console.log(holidayrequestToSave);
    this.store.dispatch(
      employeesActions.updateRequest({
        employee_id: this.employee.id,
        request: holidayrequestToSave,
      })
    );
  }

  onSubmit() {
    this.submitted = true;

    let holidayrequestToSave = {
      ...this.holidayForm.value,
      type: 'holiday',
      employee_holiday_period_id:
        this.selectedHolidayPeriodId === -1
          ? null
          : this.selectedHolidayPeriodId,
    } as HolidayRequest;

    console.log(holidayrequestToSave);
    this.store.dispatch(
      employeesActions.addRequest({
        employee_id: this.employee.id,
        request: holidayrequestToSave,
      })
    );
  }

  getControlErrorMessage(fca: AbstractControl | null, label: string) {
    let fc = fca as AbstractControl;
    if (fc.hasError('required')) {
      return label + ' is required';
    } else if (fc.hasError('minlength')) {
      return label + ' too short';
    } else if (fc.hasError('maxlength')) {
      return label + ' too long';
    } else if (fc.hasError('pattern')) {
      return 'Invalid characters';
    } else if (fc.hasError('min')) {
      return label + ' has to be at least 1';
    } else if (fc.hasError('timenotvalid')) {
      return 'Invalid time';
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
