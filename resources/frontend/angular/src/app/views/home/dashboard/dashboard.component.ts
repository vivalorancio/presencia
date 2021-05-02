import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Employee } from 'src/app/shared/models/employee.model';
import { Shift } from 'src/app/shared/models/shift.model';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import { Incidence } from 'src/app/shared/models/incidence.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employee!: Employee;
  employeedisplayname = '';
  bookingmessage = '';
  bookingerror: boolean = false;

  shift!: Shift;

  incidences: Incidence[] = [];
  selectedIncidenceId: number = -1;

  constructor(private store: Store<AppState>, private http: HttpClient) {}

  ngOnInit(): void {
    this.store.select('authentication', 'employee').subscribe((employee) => {
      this.employee = employee.data;
      this.employeedisplayname = employee.data?.first_name;
    });
    this.store.select('authentication', 'shift').subscribe((shift) => {
      this.shift = shift.data;
    });
    this.store
      .select('authentication', 'incidences')
      .subscribe((incidences) => {
        this.incidences = incidences;
      });
  }

  getTextColourFromName = getTextColourFromName;

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

    let incidence_id =
      this.selectedIncidenceId != -1 ? this.selectedIncidenceId : null;

    this.http
      .post(
        `/api/employees/${this.employee.id}/bookings`,
        { date, time, incidence_id },
        {
          withCredentials: true,
          // observe: 'response',
        }
      )
      .subscribe(
        (res: any) => {
          this.bookingerror = false;
          this.bookingmessage = res.message;
          this.selectedIncidenceId = -1;
          console.log(res);
        },
        (err) => {
          this.bookingerror = true;
          this.bookingmessage = err.error.errors.date;
          this.selectedIncidenceId = -1;
          console.log(err.error);
        }
      );
  }
}
