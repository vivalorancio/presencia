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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employee!: Employee;
  employeedisplayname = '';

  shift!: Shift;

  incidences: Incidence[] = [];
  selectedIncidenceId: number = -1;
  datetime!: Date;
  pending: boolean = false;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private bookingnotificationService: BookingNotificationService
  ) {}

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

  updateDatetime(datetime: Date) {
    this.datetime = datetime;
  }

  book() {
    this.pending = true;

    let date = dateAAAAMMDD(this.datetime);
    let time = timeHHMMSS(this.datetime);

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
      // .pipe(delay(1000))
      .subscribe(
        (res: any) => {
          this.pending = false;
          this.selectedIncidenceId = -1;
          this.bookingnotificationService.showSuccessNotification(res.message);
          console.log(res);
        },
        (err) => {
          this.pending = false;
          this.selectedIncidenceId = -1;
          this.bookingnotificationService.showErrorNotification(
            err.error.errors.date
          );
          console.log(err.error);
        }
      );
  }
}
