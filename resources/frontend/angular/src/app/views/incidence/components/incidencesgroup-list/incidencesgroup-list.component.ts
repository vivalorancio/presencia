import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import {
  IncidencesGroupCollection,
  IncidencesGroupSearch,
} from 'src/app/shared/models/incidence.model';
import {
  DisplayResourceCollection,
  ListHeader,
} from 'src/app/shared/models/resource.model';

import * as incidencesActions from '../../actions';

@Component({
  selector: 'app-incidencesgroup-list',
  templateUrl: './incidencesgroup-list.component.html',
  styleUrls: ['./incidencesgroup-list.component.css'],
})
export class IncidencesgroupListComponent implements OnInit {
  incidencesgroups!: IncidencesGroupCollection;
  pending: boolean = false;
  display!: DisplayResourceCollection;
  search!: IncidencesGroupSearch;

  private searchSubject: Subject<IncidencesGroupSearch> = new Subject();

  headers: ListHeader[] = [
    { text: 'Code', sort_by: 'code', hides: false, search_by: 'code' },
    {
      text: 'Description',
      sort_by: 'description',
      hides: false,
      search_by: 'description',
    },
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

    this.store.select('incidencesgroups').subscribe((incidencesgroups) => {
      this.incidencesgroups = incidencesgroups.incidencesgroups;
      this.pending = incidencesgroups.pending;
      this.display = incidencesgroups.display;
    });

    if (this.incidencesgroups.meta === null) this.dispatchLoad();
  }

  open(id: number) {
    this.router.navigate([
      `/management/incidencesgroups/incidencesgroup/${id}`,
    ]);
  }

  dispatchLoad(): void {
    this.store.dispatch(
      incidencesActions.loadIncidencesGroups({
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

    if (this.search[from as keyof IncidencesGroupSearch] === event.target.value)
      return;

    this.search = {
      ...this.search,
      [from as keyof IncidencesGroupSearch]: event.target.value,
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

  toKey(sb: string): keyof IncidencesGroupSearch {
    return sb as keyof IncidencesGroupSearch;
  }
}
