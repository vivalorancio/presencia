import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import { Employee } from 'src/app/shared/models/employee.model';
import { IncidenceCollection } from 'src/app/shared/models/incidence.model';
import {
  AbsenceRequest,
  Request,
  RequestCollection,
} from 'src/app/shared/models/request.model';

import * as employeesActions from '../../actions';

const rangeValidator: any = (fg: FormGroup) => {
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
};

@Component({
  selector: 'app-absencerequest-edit',
  templateUrl: './absencerequest-edit.component.html',
  styleUrls: ['./absencerequest-edit.component.css'],
})
export class AbsencerequestEditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  absenceForm!: FormGroup;
  submiterror: any;
  pending: boolean = false;
  request_id!: number;

  is_supervised: boolean = false;

  submitted: boolean = false;
  showDeleteConfirmation = false;

  employee: Employee = {} as Employee;
  incidences!: IncidenceCollection;
  pending_employee: boolean = false;

  requests!: RequestCollection;
  pending_requests: boolean = false;
  request!: any;

  selectedIncidenceId: number = -1;

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
        this.incidences = employee.incidences;
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

    this.route.params.pipe(takeUntil(this.ngDestroyed$)).subscribe((params) => {
      this.request_id = +params.request_id;

      const the_request: any = (this.requests?.data.find(
        (absence: any) => absence.id === this.request_id
      ) || {}) as Request;

      if (the_request !== {}) {
        this.request = the_request;
      }
    });
    this.is_supervised =
      this.route.snapshot.url[0]?.path === 'supervisedrequests';

    this.absenceForm = this.formBuilder.group(
      {
        date_from: [
          {
            value:
              this.request.absence?.date_from ||
              dateAAAAMMDD(new Date(Date.now())),
            disabled: this.request.id,
          },
          Validators.required,
        ],
        date_to: [
          {
            value:
              this.request.absence?.date_to ||
              dateAAAAMMDD(new Date(Date.now())),
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
      { validator: rangeValidator }
    );

    this.selectedIncidenceId = this.request.absence?.incidence_id || -1;

    this.store
      .select('request')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((request) => {
        this.pending = request.pending;
        this.submiterror = request.error;
      });
  }

  getTextColourFromName = getTextColourFromName;

  ispending() {
    return this.pending || this.pending_employee || this.pending_requests;
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
    console.log(this.absenceForm.value);

    let absencerequestToSave = {
      ...this.absenceForm.value,
      status: status,
      validator_id: this.employee.id,
      id: this.request.id,
    } as AbsenceRequest;

    this.store.dispatch(
      employeesActions.updateRequest({
        employee_id: this.employee.id,
        request: absencerequestToSave,
      })
    );
  }

  onSubmit() {
    this.submitted = true;
    let time = this.absenceForm.get('time')?.value;
    time = time && time.length === 5 ? time + ':00' : time;

    let absencerequestToSave = {
      ...this.absenceForm.value,
      type: 'absence',
      time: time,
      incidence_id:
        this.selectedIncidenceId === -1 ? null : this.selectedIncidenceId,
    } as AbsenceRequest;
    this.store.dispatch(
      employeesActions.addRequest({
        employee_id: this.employee.id,
        request: absencerequestToSave,
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
