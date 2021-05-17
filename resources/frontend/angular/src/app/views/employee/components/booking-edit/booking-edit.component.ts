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
  Booking,
  DayBookingsCollection,
} from 'src/app/shared/models/booking.model';
import {
  Employee,
  EmployeeCollection,
} from 'src/app/shared/models/employee.model';
import { IncidenceCollection } from 'src/app/shared/models/incidence.model';
import { User } from 'src/app/shared/models/user.model';

import * as employeesActions from '../../actions';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.css'],
})
export class BookingEditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  bookingForm!: FormGroup;
  bookings!: DayBookingsCollection;
  pending_bookings: boolean = false;
  pending: boolean = false;
  submiterror: any;

  submitted: boolean = false;
  showDeleteConfirmation = false;

  booking_id!: number;
  booking: Booking = {} as Booking;
  employee_id!: number;

  user!: User;
  pending_user: boolean = false;

  employees!: EmployeeCollection;
  pending_employees: boolean = false;
  employee: Employee = {} as Employee;
  incidences!: IncidenceCollection;
  pending_employee: boolean = false;

  selectedIncidenceId: number = -1;

  ngOnInit(): void {
    this.store.select('authentication').subscribe((authentication) => {
      this.user = authentication.user;
      this.pending_user = authentication.pending;
    });

    this.store.select('employees').subscribe((employees) => {
      this.employees = employees.employees;
      this.pending_employees = employees.pending;
    });

    this.store.select('employee').subscribe((employee) => {
      this.employee = employee.employee.data;
      this.incidences = employee.incidences;
      this.pending_employee = employee.pending;
    });

    this.store.select('bookings').subscribe((bookings) => {
      this.bookings = bookings.bookings;
      this.submiterror = bookings.error;
      this.pending_bookings = bookings.pending;
    });

    this.route.params.subscribe((params) => {
      this.employee_id = +params.employee_id;
      this.store.dispatch(
        employeesActions.loadEmployee({ employee_id: this.employee_id })
      );
      this.booking_id = +params.booking_id;

      let the_bookings = this.bookings?.data
        .map((day) => day.bookings)
        .reduce((acc, val) => acc.concat(val), []);

      const the_booking: any = (the_bookings?.find(
        (booking: any) => booking.id === this.booking_id
      ) || {}) as Booking;

      if (the_booking !== {}) {
        this.booking = the_booking;
      }
    });

    this.selectedIncidenceId = this.booking?.incidence_id || -1;

    this.bookingForm = this.formBuilder.group({
      date: [
        this.booking.date || dateAAAAMMDD(new Date(Date.now())),
        Validators.required,
      ],
      time: [this.booking.time || '00:00', Validators.required],
    });
  }

  ispending() {
    return (
      this.pending ||
      this.pending_bookings ||
      this.pending_user ||
      this.pending_employees ||
      this.pending_employee
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
        employeesActions.deleteEmployeeBooking({
          employee_id: this.employee_id,
          booking_id: this.booking.id,
        })
      );
  }

  onSubmit() {
    this.submitted = true;
    let time = this.bookingForm.get('time')?.value;
    time = time && time.length === 5 ? time + ':00' : time;

    let bookingToSave = {
      ...this.bookingForm.value,
      time: time,
      user_id: this.user.id,
      incidence_id:
        this.selectedIncidenceId === -1 ? null : this.selectedIncidenceId,
    };
    if (this.booking.id == null) {
      this.store.dispatch(
        employeesActions.addEmployeeBooking({
          employee_id: this.employee_id,
          booking: bookingToSave,
        })
      );
    } else {
      bookingToSave = {
        id: this.booking.id,
        ...bookingToSave,
      };
      this.store.dispatch(
        employeesActions.updateEmployeeBooking({
          employee_id: this.employee_id,
          booking: bookingToSave,
        })
      );
    }
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
