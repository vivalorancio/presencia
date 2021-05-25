import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Employee } from 'src/app/shared/models/employee.model';
import { Shift } from 'src/app/shared/models/shift.model';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import { Incidence } from 'src/app/shared/models/incidence.model';
import { dateAAAAMMDD, timeHHMMSS } from 'src/app/shared/calendar/calendar';
import { BookingNotificationService } from 'src/app/shared/notifications/booking/booking-notification.service';
import { delay, takeUntil } from 'rxjs/operators';
import {
  Booking,
  DayBookingsCollection,
} from 'src/app/shared/models/booking.model';

import * as employeesActions from '../../../views/employee/actions';
import { Subject } from 'rxjs';
// import { RequestCollection } from 'src/app/shared/models/request.model';
// import { DisplayRequestsCollection } from 'src/app/shared/models/resource.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pending: boolean = false;

  pending_employee: boolean = false;
  employee!: Employee;
  employeedisplayname = '';
  shift!: Shift;
  incidences: Incidence[] = [];

  bookings!: DayBookingsCollection;
  pending_bookings: boolean = false;

  loadbookings: boolean = false;

  selectedIncidenceId: number = -1;

  datetime!: Date;

  pending_booking: boolean = false;
  res_booking!: any;
  err_booking!: any;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private bookingnotificationService: BookingNotificationService
  ) {}

  ngDestroyed$: any;

  public ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

  ngOnInit(): void {
    this.ngDestroyed$ = new Subject();
    this.store
      .select('authentication')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((authentication) => {
        this.pending = authentication.pending;

        if (authentication.user.data?.employee_id && !this.employee) {
          this.store.dispatch(
            employeesActions.loadEmployee({
              employee_id: authentication.user.data?.employee_id,
            })
          );
          // this.loadrequests = true;
          this.loadbookings = true;
        }
      });

    this.store
      .select('employee')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((employee) => {
        this.employee = employee.employee.data;
        this.employeedisplayname = employee.employee.data?.first_name;
        this.shift = employee.shift.data;
        this.incidences = employee.incidences.data;
        this.pending_employee = employee.pending;

        if (
          this.employee &&
          this.loadbookings === true &&
          !this.pending_bookings
        ) {
          this.loadbookings = false;
          this.dispatchEmployeeBookingsLoad();
        }
      });

    this.store
      .select('booking')
      // .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((booking) => {
        this.pending_booking = booking.pending;
        this.res_booking = booking.res;
        this.err_booking = booking.error;

        if (this.res_booking) {
          this.dispatchEmployeeBookingsLoad();

          this.bookingnotificationService.showSuccessNotification(
            this.res_booking.message
          );
        }
        if (this.err_booking) {
          this.bookingnotificationService.showErrorNotification(
            this.err_booking.error.errors.date
          );
        }
      });

    this.store
      .select('bookings')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((bookings) => {
        this.bookings = bookings.bookings;
        this.pending_bookings = bookings.pending;
      });
  }

  getTextColourFromName = getTextColourFromName;

  isloading() {
    return this.pending || this.pending_employee || this.pending_bookings;
  }

  dispatchEmployeeBookingsLoad(): void {
    this.store.dispatch(
      employeesActions.loadEmployeeBookings({
        employee_id: this.employee.id,
        bookingsdisplay: {
          range: 'day',
          date: dateAAAAMMDD(new Date(Date.now())),
        },
      })
    );
  }

  updateDatetime(datetime: Date) {
    this.datetime = datetime;
  }

  book() {
    let booking: Booking = {
      date: dateAAAAMMDD(this.datetime),
      time: timeHHMMSS(this.datetime),
      incidence_id:
        this.selectedIncidenceId != -1 ? this.selectedIncidenceId : null,
    } as Booking;

    this.store.dispatch(
      employeesActions.book({
        employee_id: this.employee.id,
        booking,
      })
    );
    this.selectedIncidenceId = -1;
  }
}
