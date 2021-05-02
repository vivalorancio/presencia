import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import {
  Calendar,
  CalendarCollection,
} from 'src/app/shared/models/calendar.model';
import {
  EmployeeCalendar,
  EmployeeCalendarCollection,
} from 'src/app/shared/models/employee.model';

import * as employeesActions from '../../actions';
import * as calendarsActions from '../../../calendar/actions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employeecalendar-list',
  templateUrl: './employeecalendar-list.component.html',
  styleUrls: ['./employeecalendar-list.component.css'],
})
export class EmployeecalendarListComponent implements OnInit {
  employeecalendarForm!: FormGroup;

  employee_id!: number;

  employeecalendars!: EmployeeCalendarCollection;
  pending: boolean = false;

  calendars!: CalendarCollection;
  pending_calendars: boolean = false;
  availablecalendars!: Calendar[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('employeecalendars').subscribe((employeecalendars) => {
      this.employeecalendars = employeecalendars.employeecalendars;
      this.pending = employeecalendars.pending;
    });

    this.store.select('calendars').subscribe((calendars) => {
      this.calendars = calendars.calendars;
      this.pending_calendars = calendars.pending;
    });

    if (this.calendars.meta === null)
      this.store.dispatch(calendarsActions.loadCalendars({ page: '1' }));

    this.route.params.subscribe((params) => {
      this.employee_id = +params.employee_id;

      this.store.dispatch(
        employeesActions.loadEmployeeCalendars({
          employee_id: this.employee_id,
          page: '1',
        })
      );
    });

    this.employeecalendarForm = this.formBuilder.group({
      calendar_id: [],
    });
  }

  getCalendar(calendar_id: number): Calendar {
    return (
      this.calendars.data.find((calendar) => calendar.id === calendar_id) ||
      ({} as Calendar)
    );
  }

  getAvailableCalendars(): Calendar[] {
    return this.calendars.data.filter((calendar) => {
      return (
        this.employeecalendars.data.find(
          (employeecalendar) => employeecalendar.year === calendar.year
        ) === undefined
      );
    });
  }

  addCalendar() {
    let employeecalendar: EmployeeCalendar = {
      year: this.getCalendar(
        this.employeecalendarForm.get('calendar_id')?.value
      ).year,
      ...this.employeecalendarForm.value,
    };
    this.store.dispatch(
      employeesActions.addEmployeeCalendar({
        employee_id: this.employee_id,
        employeecalendar,
      })
    );
  }

  deleteCalendar(employeecalendar_id: number) {
    this.store.dispatch(
      employeesActions.deleteEmployeeCalendar({
        employee_id: this.employee_id,
        employeecalendar_id,
      })
    );
  }

  firstpage() {
    this.store.dispatch(
      employeesActions.loadEmployeeCalendars({
        employee_id: this.employee_id,
        page: '1',
      })
    );
  }
  previouspage() {
    this.store.dispatch(
      employeesActions.loadEmployeeCalendars({
        employee_id: this.employee_id,
        page: `${this.employeecalendars.meta?.current_page - 1}`,
      })
    );
  }
  nextpage() {
    this.store.dispatch(
      employeesActions.loadEmployeeCalendars({
        employee_id: this.employee_id,
        page: `${this.employeecalendars.meta?.current_page + 1}`,
      })
    );
  }
  lastpage() {
    this.store.dispatch(
      employeesActions.loadEmployeeCalendars({
        employee_id: this.employee_id,
        page: this.employeecalendars.meta?.last_page,
      })
    );
  }
}
