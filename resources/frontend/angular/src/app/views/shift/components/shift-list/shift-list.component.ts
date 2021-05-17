import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import {
  DisplayResourceCollection,
  ListHeader,
} from 'src/app/shared/models/resource.model';
import {
  Shift,
  ShiftCollection,
  ShiftSearch,
} from 'src/app/shared/models/shift.model';

import * as shiftsActions from '../../actions';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css'],
})
export class ShiftListComponent implements OnInit {
  shifts!: ShiftCollection;
  pending: boolean = false;
  display!: DisplayResourceCollection;
  search!: ShiftSearch;

  private searchSubject: Subject<ShiftSearch> = new Subject();

  headers: ListHeader[] = [
    { text: 'Code', sort_by: 'code', hides: false, search_by: 'code' },
    {
      text: 'Description',
      sort_by: 'description',
      hides: false,
      search_by: 'description',
    },
    { text: 'Start Time', sort_by: '', hides: false, search_by: '' },
    { text: 'End Time', sort_by: '', hides: false, search_by: '' },
    { text: 'Expected Time', sort_by: '', hides: false, search_by: '' },
    { text: 'Recess Time', sort_by: '', hides: false, search_by: '' },
    { text: 'Holiday', sort_by: 'is_holiday', hides: false, search_by: '' },
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
      description: '',
      code: '',
    };

    this.store.select('shifts').subscribe((shifts) => {
      this.shifts = shifts.shifts;
      this.pending = shifts.pending;
      this.display = shifts.display;
    });

    if (this.shifts.meta === null) this.dispatchLoad();
  }

  getTextColourFromName = getTextColourFromName;

  open(id: number) {
    this.router.navigate([`/management/shifts/shift/${id}`]);
  }

  dispatchLoad(): void {
    this.store.dispatch(
      shiftsActions.loadShifts({
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

    if (this.search[from as keyof ShiftSearch] === event.target.value) return;

    this.search = {
      ...this.search,
      [from as keyof ShiftSearch]: event.target.value,
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

  toKey(sb: string): keyof ShiftSearch {
    return sb as keyof ShiftSearch;
  }
}
