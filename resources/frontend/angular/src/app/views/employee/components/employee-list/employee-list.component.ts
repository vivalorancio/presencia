import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import {
  getTextColour,
  getTextColourFromName,
} from 'src/app/shared/colour-picker/colours';
import {
  EmployeeCollection,
  EmployeeSearch,
} from 'src/app/shared/models/employee.model';
import {
  DisplayResourceCollection,
  ListHeader,
} from 'src/app/shared/models/resource.model';

import * as employeesActions from '../../actions';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees!: EmployeeCollection;
  pending: boolean = false;
  display!: DisplayResourceCollection;
  search!: EmployeeSearch;

  private searchSubject: Subject<EmployeeSearch> = new Subject();

  headers: ListHeader[] = [
    { text: 'Name', sort_by: 'last_name', hides: false, search_by: 'name' },
    { text: 'Code', sort_by: 'code', hides: false, search_by: 'code' },
    {
      text: 'ID Number',
      sort_by: 'national_id',
      hides: false,
      search_by: 'national_id',
    },
    { text: 'email', sort_by: 'email', hides: true, search_by: 'email' },
    {
      text: 'Validity',
      sort_by: 'start_date',
      hides: false,
      search_by: 'validity',
    },
    { text: 'Def. Shift', sort_by: '', hides: false, search_by: '' },
    { text: 'Inci. Gr.', sort_by: '', hides: false, search_by: '' },
    {
      text: 'Department',
      sort_by: 'department',
      hides: false,
      search_by: 'department',
    },
    {
      text: 'Area',
      sort_by: 'area',
      hides: false,
      search_by: 'area',
    },
    {
      text: 'Section',
      sort_by: 'section',
      hides: false,
      search_by: 'section',
    },
  ];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.display = {
      page: '1',
      per_page: '25',
      sort_field: 'last_name',
      sort_direction: 'asc',
    };
    this.search = {
      name: '',
      code: '',
      national_id: '',
      email: '',
      validity: '',
      department: '',
      area: '',
      section: '',
    };

    this.store.select('employees').subscribe((employees) => {
      this.employees = employees.employees;
      this.pending = employees.pending;
      this.display = employees.display;
    });

    if (this.employees.meta === null) {
      this.dispatchLoad();
    }
  }

  getTextColourFromName = getTextColourFromName;

  open(id: number) {
    console.log(id);
    this.router.navigate([`/management/employees/employee/${id}`]);
  }

  dispatchLoad(): void {
    this.store.dispatch(
      employeesActions.loadEmployees({
        display: this.display,
        search: this.search,
      })
    );
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

  initSearch() {
    if (this.searchSubject.observers.length === 0) {
      this.searchSubject
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(() => {
          this.dispatchLoad();
        });
    }
  }

  doSearch(from: string, event: any) {
    this.initSearch();

    if (this.search[from as keyof EmployeeSearch] === event.target.value)
      return;

    this.search = {
      ...this.search,
      [from as keyof EmployeeSearch]: event.target.value,
    };

    this.display = { ...this.display, page: '1' };

    this.searchSubject.next(this.search);
  }
  clearSearch() {
    this.search = {
      name: '',
      code: '',
      national_id: '',
      email: '',
      validity: '',
      department: '',
      area: '',
      section: '',
    };

    this.display = { ...this.display, page: '1' };

    this.searchSubject.next(this.search);
  }

  toKey(sb: string): keyof EmployeeSearch {
    return sb as keyof EmployeeSearch;
  }
}
