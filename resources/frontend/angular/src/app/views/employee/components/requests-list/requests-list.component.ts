import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Employee } from 'src/app/shared/models/employee.model';
import {
  Request,
  RequestCollection,
} from 'src/app/shared/models/request.model';
import {
  DisplayRequestsCollection,
  ListHeader,
  RequestsListHeader,
} from 'src/app/shared/models/resource.model';

import * as employeesActions from '../../actions';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css'],
})
export class RequestsListComponent implements OnInit {
  employee_id!: number;
  employee!: Employee;
  pending_employee: boolean = false;

  is_supervised: boolean = false;

  requests!: RequestCollection;
  pending_requests: boolean = false;
  display: DisplayRequestsCollection = {} as DisplayRequestsCollection;

  headers: RequestsListHeader[] = [
    {
      text: 'Request Date',
      sort_by: 'created_at',
      hides: false,
      search_by: '',
      for_supevisor: false,
    },
    {
      text: 'Employee',
      sort_by: '',
      hides: false,
      search_by: '',
      for_supevisor: true,
    },
    {
      text: 'Type',
      sort_by: 'type',
      hides: false,
      search_by: '',
      for_supevisor: false,
    },
    {
      text: 'Status',
      sort_by: 'status',
      hides: false,
      search_by: '',
      for_supevisor: false,
    },
    {
      text: 'Validator',
      sort_by: '',
      hides: false,
      search_by: '',
      for_supevisor: false,
    },
    {
      text: 'Validated at',
      sort_by: '',
      hides: false,
      search_by: '',
      for_supevisor: false,
    },
  ];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select('employee').subscribe((employee) => {
      this.employee = employee.employee.data;
      this.employee_id = this.employee?.id;
      this.pending_employee = employee.pending;

      if (!this.employee) {
        this.router.navigate(['/dashboard']);
      }
    });

    this.is_supervised =
      this.route.snapshot.url[0]?.path === 'supervisedrequests';

    if (!this.pending_employee && this.employee_id && !this.pending_requests) {
      this.display = {
        page: '1',
        per_page: '25',
        sort_field: 'created_at',
        sort_direction: 'asc',
        type: '',
        status: '',
      };

      this.dispatchLoad();
    }

    this.store.select('requests').subscribe((requests) => {
      this.requests = requests.requests;
      this.pending_requests = requests.pending;
      this.display = requests.display;
    });
  }

  ispending(): boolean {
    return this.pending_employee || this.pending_requests;
  }

  displayname(employee: Employee) {
    return employee ? employee.last_name + ', ' + employee.first_name : '';
  }

  open(request: Request) {
    let requestroute = 'requests';
    if (this.is_supervised) {
      requestroute = 'supervisedrequests';
    }

    this.router.navigate([
      `/dashboard/${requestroute}/${request.type}/${request.id}`,
    ]);
  }

  dispatchLoad(): void {
    if (!this.is_supervised) {
      this.store.dispatch(
        employeesActions.loadEmployeeRequests({
          employee_id: this.employee.id,
          display: this.display,
        })
      );
    } else {
      this.store.dispatch(
        employeesActions.loadEmployeeSupervisedRequests({
          employee_id: this.employee.id,
          display: this.display,
        })
      );
    }
  }

  loadpage(page: string) {
    this.display = { ...this.display, page: page };
    this.dispatchLoad();
  }

  orderBy(sort_field: string) {
    let asc = false;
    if (this.display.sort_field === sort_field) {
      this.toggleDirection();
    } else {
      asc = true;
    }

    this.display = {
      ...this.display,
      sort_field: sort_field,
      sort_direction: asc ? 'asc' : this.display.sort_direction,
      page: '1',
    };

    this.dispatchLoad();
  }

  toggleDirection() {
    if (this.display.sort_direction === 'asc') {
      this.display = { ...this.display, sort_direction: 'desc' };
    } else {
      this.display = { ...this.display, sort_direction: 'asc' };
    }
  }

  onPerpageSelected(event: any) {
    const per_page = event.target.value;
    this.display = { ...this.display, per_page: per_page, page: '1' };
    this.dispatchLoad();
  }
}
