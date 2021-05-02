import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { getTextColour } from 'src/app/shared/colour-picker/colours';
import {
  Employee,
  EmployeeCollection,
} from 'src/app/shared/models/employee.model';

import * as employeesActions from '../../actions';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees!: EmployeeCollection;
  pending: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('employees').subscribe((employees) => {
      this.employees = employees.employees;
      this.pending = employees.pending;
    });

    if (this.employees.meta === null)
      this.store.dispatch(employeesActions.loadEmployees({ page: '1' }));
  }

  getTextColour = getTextColour;

  deleteEmployee(id: number) {
    /// Confirmation DIALOG!!!!!

    this.store.dispatch(employeesActions.deleteEmployee({ id }));
  }

  firstpage() {
    this.store.dispatch(employeesActions.loadEmployees({ page: '1' }));
  }
  previouspage() {
    this.store.dispatch(
      employeesActions.loadEmployees({
        page: `${this.employees.meta?.current_page - 1}`,
      })
    );
  }
  nextpage() {
    this.store.dispatch(
      employeesActions.loadEmployees({
        page: `${this.employees.meta?.current_page + 1}`,
      })
    );
  }
  lastpage() {
    this.store.dispatch(
      employeesActions.loadEmployees({ page: this.employees.meta?.last_page })
    );
  }
}
