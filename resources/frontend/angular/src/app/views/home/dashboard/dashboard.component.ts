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
import { delay } from 'rxjs/operators';
import { Booking } from 'src/app/shared/models/booking.model';

import * as employeesActions from '../../../views/employee/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pending: boolean = false;
  employee!: Employee;
  employeedisplayname = '';
  shift!: Shift;
  incidences: Incidence[] = [];
  selectedIncidenceId: number = -1;

  pending_employee: boolean = false;
  // employee2!: Employee;
  // employeedisplayname2 = '';
  // shift2!: Shift;
  // incidences2: Incidence[] = [];

  datetime!: Date;
  pending_booking: boolean = false;
  res_booking!: any;
  err_booking!: any;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private bookingnotificationService: BookingNotificationService
  ) {}

  ngOnInit(): void {
    this.store.select('authentication').subscribe((authentication) => {
      // this.employee = authentication.employee.data;
      // this.employeedisplayname = authentication.employee.data?.first_name;
      // this.shift = authentication.shift.data;
      // this.incidences = authentication.incidences;
      this.pending = authentication.pending;

      if (authentication.user.employee_id !== null) {
        this.store.dispatch(
          employeesActions.loadEmployee({
            employee_id: authentication.user.employee_id,
          })
        );
      }
    });
    this.store.select('employee').subscribe((employee) => {
      this.employee = employee.employee.data;
      this.employeedisplayname = employee.employee.data?.first_name;
      this.shift = employee.shift.data;
      this.incidences = employee.incidences.data;
      this.pending_employee = employee.pending;
    });

    this.store.select('booking').subscribe((booking) => {
      this.pending_booking = booking.pending;
      this.res_booking = booking.res;
      this.err_booking = booking.error;

      if (this.res_booking) {
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
  }

  getTextColourFromName = getTextColourFromName;

  isloading() {
    return this.pending || this.pending_employee;
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
