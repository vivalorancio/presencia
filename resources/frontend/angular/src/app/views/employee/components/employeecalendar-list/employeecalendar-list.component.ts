import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import {
  Calendar,
  CalendarCollection,
} from 'src/app/shared/models/calendar.model';
import {
  Employee,
  EmployeeCalendar,
  EmployeeCalendarCollection,
  EmployeeCollection,
} from 'src/app/shared/models/employee.model';

import * as employeesActions from '../../actions';
import * as calendarsActions from '../../../calendar/actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColourDropdownItem } from 'src/app/shared/colour-dropdown/colour-dropdown';

@Component({
  selector: 'app-employeecalendar-list',
  templateUrl: './employeecalendar-list.component.html',
  styleUrls: ['./employeecalendar-list.component.css'],
})
export class EmployeecalendarListComponent implements OnInit {
  employeecalendarForm!: FormGroup;

  employeecalendars!: EmployeeCalendarCollection;
  pending: boolean = false;
  submiterror: any;

  calendars!: CalendarCollection;
  pending_calendars: boolean = false;
  availablecalendars!: Calendar[];

  employees!: EmployeeCollection;
  pending_employees: boolean = false;
  employee: Employee = {} as Employee;
  employee_id!: number;

  selectedCalendarId: number = -1;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('employeecalendars').subscribe((employeecalendars) => {
      this.employeecalendars = employeecalendars.employeecalendars;
      this.pending = employeecalendars.pending;
      this.submiterror = employeecalendars.error;
    });

    this.store.select('calendars').subscribe((calendars) => {
      this.calendars = calendars.calendars;
      this.pending_calendars = calendars.pending;
    });

    this.store.select('employees').subscribe((employees) => {
      this.employees = employees.employees;
      this.pending_employees = employees.pending;
    });

    if (this.calendars.meta === null)
      this.store.dispatch(calendarsActions.loadCalendars({ page: '1' }));

    this.route.params.subscribe((params) => {
      this.employee_id = +params.employee_id;
      const the_employee: any = (this.employees?.data.find(
        (employee: any) => employee.id === this.employee_id
      ) || {}) as Employee;
      if (the_employee !== {}) {
        this.employee = the_employee;
      }

      this.store.dispatch(
        employeesActions.loadEmployeeCalendars({
          employee_id: this.employee_id,
          page: '1',
        })
      );
    });

    this.submitted = false;

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

  getColourItemsArray(items: Calendar[]): ColourDropdownItem[] {
    return items.map((item: Calendar) => {
      return {
        id: item.id,
        code: '' + item.year,
        description: item.name,
        colour: 'bg-gray-300',
      };
    });
  }

  addCalendar() {
    this.submitted = true;

    let employeecalendar: EmployeeCalendar = {
      year: this.getCalendar(this.selectedCalendarId).year,
      calendar_id: this.selectedCalendarId,
    } as EmployeeCalendar;

    this.store.dispatch(
      employeesActions.addEmployeeCalendar({
        employee_id: this.employee_id,
        employeecalendar,
      })
    );
    this.selectedCalendarId = -1;
  }

  removeCalendar(employeecalendar_id: number) {
    this.store.dispatch(
      employeesActions.deleteEmployeeCalendar({
        employee_id: this.employee_id,
        employeecalendar_id,
      })
    );
  }

  getSubmitErrorDescription(): string {
    let error: string = '';
    if (this.submitted && this.submiterror?.error) {
      Object.entries(this.submiterror.error.errors).forEach((item: any) => {
        item[1].forEach((err: string) => (error += err + ' '));
      });
    }
    return error;
  }

  acceptError() {
    this.submitted = false;
  }

  loadpage(page: string) {
    this.store.dispatch(
      employeesActions.loadEmployeeCalendars({
        employee_id: this.employee_id,
        page,
      })
    );
  }
}
