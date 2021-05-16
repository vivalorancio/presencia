import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import { DayBookingsCollection } from 'src/app/shared/models/booking.model';
import {
  Employee,
  EmployeeCollection,
} from 'src/app/shared/models/employee.model';
import {
  DisplayBookingsCollection,
  ListHeader,
} from 'src/app/shared/models/resource.model';

import * as authenticationActions from '../../../authentication/actions';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css'],
})
export class BookingsListComponent implements OnInit {
  mainmodule!: string;

  employee!: Employee;
  bookings!: DayBookingsCollection;
  bookingsdisplay!: DisplayBookingsCollection;
  pending: boolean = false;

  employees!: EmployeeCollection;
  employee_id!: number;
  pending_employees: boolean = false;

  headers: ListHeader[] = [
    { text: 'Day', sort_by: '', hides: false, search_by: '' },
    { text: 'Bookings', sort_by: '', hides: false, search_by: '' },
    { text: 'Total time', sort_by: '', hides: false, search_by: '' },
    { text: 'Shift time', sort_by: '', hides: false, search_by: '' },
    { text: 'Balance', sort_by: '', hides: false, search_by: '' },
    { text: 'Anomalies', sort_by: '', hides: false, search_by: '' },
  ];

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookingsdisplay = {
      range: 'week',
      date: dateAAAAMMDD(new Date(Date.now())),
    };

    this.mainmodule = this.route.snapshot.url[0]?.path;
    console.log(this.route.snapshot);
    if (this.mainmodule === 'bookings') {
      this.store.select('authentication').subscribe((authentication) => {
        this.employee = authentication.employee.data;
        this.employee_id = this.employee?.id;
        this.bookings = authentication.bookings;
        this.bookingsdisplay = authentication.bookingsdisplay;
        this.pending = authentication.pending;
      });
      this.bookingsdisplay = {
        range: 'week',
        date: dateAAAAMMDD(new Date(Date.now())),
      };
      this.dispatchLoad();
    } else if (this.mainmodule === 'employees') {
      this.store.select('employees').subscribe((employees) => {
        this.employees = employees.employees;
        this.pending_employees = employees.pending;
      });

      this.store.select('authentication').subscribe((authentication) => {
        this.bookings = authentication.bookings;
        this.bookingsdisplay = authentication.bookingsdisplay;
        this.pending = authentication.pending;
      });

      this.route.params.subscribe((params) => {
        this.employee_id = +params.employee_id;
        const the_employee: any = (this.employees?.data.find(
          (employee: any) => employee.id === this.employee_id
        ) || {}) as Employee;
        if (the_employee !== {}) {
          this.employee = the_employee;
        }
        this.bookingsdisplay = {
          range: 'week',
          date: dateAAAAMMDD(new Date(Date.now())),
        };
        this.dispatchLoad();
      });
    }

    //if (this.bookings?.meta === null) {
    //this.dispatchLoad();
    //}
  }

  getTextColourFromName = getTextColourFromName;

  dispatchLoad(): void {
    console.log(this.employee.id);

    this.store.dispatch(
      authenticationActions.getEmployeeBookings({
        employee_id: this.employee_id,
        bookingsdisplay: this.bookingsdisplay,
      })
    );
  }

  onRangeSelected(event: any) {
    const range = event.target.value;
    this.bookingsdisplay = {
      ...this.bookingsdisplay,
      range: range,
    };
    this.dispatchLoad();
  }

  onDateSelected(event: any) {
    const date = event.target.value;
    this.bookingsdisplay = {
      ...this.bookingsdisplay,
      date: date,
    };
    this.dispatchLoad();
  }

  previous() {
    this.bookingsdisplay = {
      ...this.bookingsdisplay,
      date: this.bookings.meta.prev_date,
    };
    this.dispatchLoad();
  }

  next() {
    this.bookingsdisplay = {
      ...this.bookingsdisplay,
      date: this.bookings.meta.next_date,
    };
    this.dispatchLoad();
  }
}
