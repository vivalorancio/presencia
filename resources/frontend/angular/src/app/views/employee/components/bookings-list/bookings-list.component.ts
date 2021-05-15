import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
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
      page: '1',
      per_page: '7',
      start_date: '',
      end_date: '',
    };
    this.store.select('authentication').subscribe((authentication) => {
      this.employee = authentication.employee.data;
      this.bookings = authentication.bookings;
      this.bookingsdisplay = authentication.bookingsdisplay;
      this.pending = authentication.pending;
    });
    if (this.bookings.meta === null) {
      this.bookingsdisplay = {
        page: '1',
        per_page: '7',
        start_date: '2021-01-01',
        end_date: '2021-05-31',
      };
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
    this.bookingsdisplay = { ...this.bookingsdisplay, page: page };
    this.dispatchLoad();
  }

  onPerpageSelected(event: any) {
    const per_page = event.target.value;
    this.bookingsdisplay = {
      ...this.bookingsdisplay,
      per_page: per_page,
      page: '1',
    };
    this.dispatchLoad();
  }
}
