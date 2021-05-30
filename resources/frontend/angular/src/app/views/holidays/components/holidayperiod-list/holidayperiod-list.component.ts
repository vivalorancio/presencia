import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import {
  HolidayPeriodCollection,
  HolidayPeriodSearch,
} from 'src/app/shared/models/holidays.model';
import {
  DisplayResourceCollection,
  ListHeader,
} from 'src/app/shared/models/resource.model';

import * as holidaysActions from '../../actions';

@Component({
  selector: 'app-holidayperiod-list',
  templateUrl: './holidayperiod-list.component.html',
  styleUrls: ['./holidayperiod-list.component.css'],
})
export class HolidayperiodListComponent implements OnInit {
  holidayperiods!: HolidayPeriodCollection;
  pending: boolean = false;
  display!: DisplayResourceCollection;
  search!: HolidayPeriodSearch;

  private searchSubject: Subject<HolidayPeriodSearch> = new Subject();

  headers: ListHeader[] = [
    { text: 'Code', sort_by: 'code', hides: false, search_by: 'code' },
    {
      text: 'Description',
      sort_by: 'description',
      hides: false,
      search_by: 'description',
    },
    { text: 'Days', sort_by: '', hides: false, search_by: '' },
    { text: 'From', sort_by: '', hides: false, search_by: '' },
    { text: 'To', sort_by: '', hides: false, search_by: '' },
  ];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.display = {
      page: '1',
      per_page: '25',
      sort_field: 'code',
      sort_direction: 'asc',
    };
    this.search = {
      code: '',
      description: '',
    };

    this.store.select('holidayperiods').subscribe((holidayperiods) => {
      this.holidayperiods = holidayperiods.holidayperiods;
      this.pending = holidayperiods.pending;
      this.display = holidayperiods.display;
    });

    if (this.holidayperiods.meta === null) this.dispatchLoad();
  }

  open(id: number) {
    this.router.navigate([`/management/holidays/holidayperiods/${id}`]);
  }

  dispatchLoad(): void {
    this.store.dispatch(
      holidaysActions.loadHolidayPeriods({
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

    if (this.search[from as keyof HolidayPeriodSearch] === event.target.value)
      return;

    this.search = {
      ...this.search,
      [from as keyof HolidayPeriodSearch]: event.target.value,
    };

    this.display = { ...this.display, page: '1' };

    this.searchSubject.next(this.search);
  }
  clearSearch() {
    this.search = {
      code: '',
      description: '',
    };

    this.display = { ...this.display, page: '1' };

    this.searchSubject.next(this.search);
  }

  toKey(sb: string): keyof HolidayPeriodSearch {
    return sb as keyof HolidayPeriodSearch;
  }
}
