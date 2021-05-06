import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { CalendarCollection } from 'src/app/shared/models/calendar.model';

import * as calendarsActions from '../../actions';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css'],
})
export class CalendarListComponent implements OnInit {
  calendars!: CalendarCollection;
  pending: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('calendars').subscribe((calendars) => {
      this.calendars = calendars.calendars;
      this.pending = calendars.pending;
    });

    if (this.calendars.meta === null)
      this.store.dispatch(calendarsActions.loadCalendars({ page: '1' }));
  }

  loadpage(page: string) {
    this.store.dispatch(calendarsActions.loadCalendars({ page }));
  }
}
