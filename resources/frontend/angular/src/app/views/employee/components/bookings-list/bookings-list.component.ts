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

import * as employeesActions from '../../actions';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css'],
})
export class BookingsListComponent implements OnInit {
  is_management: boolean = false;

  bookings!: DayBookingsCollection;
  bookingsdisplay!: DisplayBookingsCollection;
  pending: boolean = false;

  employee!: Employee;
  pending_employee: boolean = false;

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

    this.is_management = this.route.snapshot.url[0]?.path === 'employees';

    if (!this.is_management) {
      this.store.select('employee').subscribe((employee) => {
        this.employee = employee.employee.data;
        this.employee_id = this.employee?.id;
        this.pending_employee = employee.pending;
      });

      if (!this.pending_employee && this.employee_id) {
        this.bookingsdisplay = {
          range: 'week',
          date: dateAAAAMMDD(new Date(Date.now())),
        };
        this.dispatchLoad();
      }
    } else if (this.is_management) {
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
      });

      this.bookingsdisplay = {
        range: 'week',
        date: dateAAAAMMDD(new Date(Date.now())),
      };
      this.dispatchLoad();
    }

    this.store.select('bookings').subscribe((bookings) => {
      this.bookings = bookings.bookings;
      this.pending = bookings.pending;
    });
  }

  getTextColourFromName = getTextColourFromName;

  ispending(): boolean {
    return this.pending || this.pending_employee || this.pending_employees;
  }

  dispatchLoad(): void {
    this.store.dispatch(
      employeesActions.loadEmployeeBookings({
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
