import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import { Employee } from 'src/app/shared/models/employee.model';
import { IncidenceCollection } from 'src/app/shared/models/incidence.model';
import {
  BookingRequest,
  Request,
  RequestCollection,
} from 'src/app/shared/models/request.model';

import * as employeesActions from '../../actions';

@Component({
  selector: 'app-bookingrequest-edit',
  templateUrl: './bookingrequest-edit.component.html',
  styleUrls: ['./bookingrequest-edit.component.css'],
})
export class BookingrequestEditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  bookingForm!: FormGroup;
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

  ngOnInit(): void {
    this.store.select('employee').subscribe((employee) => {
      this.employee = employee.employee.data;
      this.incidences = employee.incidences;
      this.pending_employee = employee.pending;

      if (!this.employee) {
        this.router.navigate(['/dashboard']);
      }
    });

    this.store.select('requests').subscribe((requests) => {
      this.requests = requests.requests;
      this.pending_requests = requests.pending;
    });

    this.route.params.subscribe((params) => {
      this.request_id = +params.request_id;

      const the_request: any = (this.requests?.data.find(
        (booking: any) => booking.id === this.request_id
      ) || {}) as Request;

      if (the_request !== {}) {
        this.request = the_request;
      }
    });
    console.log(this.request);
    this.is_supervised =
      this.route.snapshot.url[0]?.path === 'supervisedrequests';

    this.bookingForm = this.formBuilder.group({
      date: [
        {
          value:
            this.request.booking?.date || dateAAAAMMDD(new Date(Date.now())),
          disabled: this.request.id,
        },
        Validators.required,
      ],
      time: [
        {
          value: this.request.booking?.time || '00:00',
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
    });

    this.selectedIncidenceId = this.request.booking?.incidence_id || -1;

    this.store.select('bookingrequest').subscribe((bookingrequest) => {
      this.pending = bookingrequest.pending;
      this.submiterror = bookingrequest.error;
    });

    console.log(this.request.id);
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
        employeesActions.deleteBookingRequest({
          employee_id: this.employee.id,
          request_id: this.request.id,
        })
      );
    }
  }

  onSubmit() {
    this.submitted = true;
    let time = this.bookingForm.get('time')?.value;
    time = time && time.length === 5 ? time + ':00' : time;

    let bookingrequestToSave = {
      ...this.bookingForm.value,
      type: 'booking',
      time: time,
      incidence_id:
        this.selectedIncidenceId === -1 ? null : this.selectedIncidenceId,
    } as BookingRequest;
    console.log(bookingrequestToSave);
    this.store.dispatch(
      employeesActions.addBookingRequest({
        employee_id: this.employee.id,
        request: bookingrequestToSave,
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
