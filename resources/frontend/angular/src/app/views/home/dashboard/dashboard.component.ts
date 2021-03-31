import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import {
  Employee,
  EmployeeResource,
} from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  employee!: Employee;
  employeedisplayname = '';
  bookingmessage = '';

  constructor(private store: Store<AppState>, private http: HttpClient) {}

  ngOnInit(): void {
    this.store.select('authentication', 'employee').subscribe((employee) => {
      this.employee = employee.data;
      this.employeedisplayname = employee.data?.first_name;
    });
  }

  book() {
    const datetime = new Date(Date.now());
    let date =
      datetime.getFullYear() +
      '-' +
      `00${datetime.getMonth() + 1}`.slice(-2) +
      '-' +
      `00${datetime.getDate()}`.slice(-2);
    let time =
      `00${datetime.getHours()}`.slice(-2) +
      ':' +
      `00${datetime.getMinutes()}`.slice(-2) +
      ':' +
      `00${datetime.getSeconds()}`.slice(-2);

    this.http
      .post(
        `/api/employees/${this.employee.id}/bookings`,
        { date, time },
        {
          withCredentials: true,
          observe: 'response',
        }
      )
      .subscribe((res) => console.log(res));
  }
}
