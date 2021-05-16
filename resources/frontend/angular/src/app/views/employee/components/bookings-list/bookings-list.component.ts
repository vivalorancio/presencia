import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import {
  DayBookings,
  DayBookingsCollection,
  DayBookingsResource,
} from 'src/app/shared/models/booking.model';
import { Employee } from 'src/app/shared/models/employee.model';
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
  employee!: Employee;
  bookings!: DayBookingsCollection;
  bookingsdisplay!: DisplayBookingsCollection;
  pending: boolean = false;

  headers: ListHeader[] = [
    { text: 'Day', sort_by: '', hides: false, search_by: '' },
    { text: 'Bookings', sort_by: '', hides: false, search_by: '' },
    { text: 'Total time', sort_by: '', hides: false, search_by: '' },
    { text: 'Shift time', sort_by: '', hides: false, search_by: '' },
    { text: 'Balance', sort_by: '', hides: false, search_by: '' },
    { text: 'Anomalies', sort_by: '', hides: false, search_by: '' },
  ];

  constructor(private store: Store<AppState>, private http: HttpClient) {}

  ngOnInit(): void {
    this.bookingsdisplay = {
      range: 'week',
      date: dateAAAAMMDD(new Date(Date.now())),
      // page: '1',
      // per_page: '7',
      // start_date: '',
      // end_date: '',
    };
    this.store.select('authentication').subscribe((authentication) => {
      this.employee = authentication.employee.data;
      this.bookings = authentication.bookings;
      this.bookingsdisplay = authentication.bookingsdisplay;
      this.pending = authentication.pending;
    });
    if (this.bookings.meta === null) {
      this.dispatchLoad();
    }
  }

  getTextColourFromName = getTextColourFromName;

  dispatchLoad(): void {
    console.log(this.employee.id);

    this.store.dispatch(
      authenticationActions.getEmployeeBookings({
        employee_id: this.employee.id,
        bookingsdisplay: this.bookingsdisplay,
      })
    );
  }

  loadpage(page: string) {
    // this.bookingsdisplay = { ...this.bookingsdisplay, page: page };
    // this.dispatchLoad();
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
