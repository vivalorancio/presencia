import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import {
  Employee,
  EmployeeCollection,
  EmployeeHolidayPeriod,
  EmployeeHolidayPeriodCollection,
} from 'src/app/shared/models/employee.model';
import {
  HolidayPeriod,
  HolidayPeriodCollection,
  HolidayPeriodSearch,
} from 'src/app/shared/models/holidays.model';

import * as employeesActions from '../../actions';
import * as holidayssActions from '../../../holidays/actions';
import { ColourDropdownItem } from 'src/app/shared/colour-dropdown/colour-dropdown';

@Component({
  selector: 'app-employeeholidayperiod-list',
  templateUrl: './employeeholidayperiod-list.component.html',
  styleUrls: ['./employeeholidayperiod-list.component.css'],
})
export class EmployeeholidayperiodListComponent implements OnInit {
  employeeholidayperiodForm!: FormGroup;

  employeeholidayperiods!: EmployeeHolidayPeriodCollection;
  pending: boolean = false;
  submiterror: any;

  holidayperiods!: HolidayPeriodCollection;
  pending_holidayperiods: boolean = false;
  availableholidayperiods!: HolidayPeriod[];

  employees!: EmployeeCollection;
  pending_employees: boolean = false;
  employee: Employee = {} as Employee;
  employee_id!: number;

  selectedHolidayPeriodId: number = -1;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('employeeholidayperiods')
      .subscribe((employeeholidayperiods) => {
        this.employeeholidayperiods =
          employeeholidayperiods.employeeholidayperiods;
        this.pending = employeeholidayperiods.pending;
        this.submiterror = employeeholidayperiods.error;
      });

    this.store.select('holidayperiods').subscribe((holidayperiods) => {
      this.holidayperiods = holidayperiods.holidayperiods;
      this.pending_holidayperiods = holidayperiods.pending;
    });

    this.store.select('employees').subscribe((employees) => {
      this.employees = employees.employees;
      this.pending_employees = employees.pending;
    });

    //if (this.holidayperiods.meta === null)
    this.store.dispatch(
      holidayssActions.loadHolidayPeriods({
        display: {
          page: '1',
          per_page: '10000',
          sort_field: 'year',
          sort_direction: 'asc',
        },
        search: {} as HolidayPeriodSearch,
      })
    );

    this.route.params.subscribe((params) => {
      this.employee_id = +params.employee_id;
      const the_employee: any = (this.employees?.data.find(
        (employee: any) => employee.id === this.employee_id
      ) || {}) as Employee;
      if (the_employee !== {}) {
        this.employee = the_employee;
      }

      this.store.dispatch(
        employeesActions.loadEmployeeHolidayPeriods({
          employee_id: this.employee_id,
          page: '1',
        })
      );
    });

    this.submitted = false;

    this.employeeholidayperiodForm = this.formBuilder.group({
      holidayperiod_id: [],
    });
  }

  getHolidayPeriod(holidayperiod_id: number): HolidayPeriod {
    return (
      this.holidayperiods.data.find(
        (holidayperiod) => holidayperiod.id === holidayperiod_id
      ) || ({} as HolidayPeriod)
    );
  }

  getAvailableHolidayPeriods(): HolidayPeriod[] {
    return this.holidayperiods.data.filter((holidayperiod) => {
      return (
        this.employeeholidayperiods.data.find(
          (employeeholidayperiod) =>
            employeeholidayperiod.holiday_period_id === holidayperiod.id
        ) === undefined
      );
    });
  }

  getColourItemsArray(items: HolidayPeriod[]): ColourDropdownItem[] {
    return items.map((item: HolidayPeriod) => {
      return {
        id: item.id,
        code: '' + item.code,
        description: item.description,
        colour: 'bg-gray-300',
      };
    });
  }

  addHolidayPeriod() {
    this.submitted = true;

    let employeeholidayperiod: EmployeeHolidayPeriod = {
      holiday_period_id: this.selectedHolidayPeriodId,
    } as EmployeeHolidayPeriod;

    this.store.dispatch(
      employeesActions.addEmployeeHolidayPeriod({
        employee_id: this.employee_id,
        employeeholidayperiod,
      })
    );
    this.selectedHolidayPeriodId = -1;
  }

  removeHolidayPeriod(employeeholidayperiod_id: number) {
    this.store.dispatch(
      employeesActions.deleteEmployeeHolidayPeriod({
        employee_id: this.employee_id,
        employeeholidayperiod_id,
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
      employeesActions.loadEmployeeHolidayPeriods({
        employee_id: this.employee_id,
        page,
      })
    );
  }
}
