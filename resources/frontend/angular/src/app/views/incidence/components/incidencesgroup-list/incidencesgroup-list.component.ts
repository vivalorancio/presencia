import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { IncidencesGroupCollection } from 'src/app/shared/models/incidence.model';

import * as incidencesActions from '../../actions';

@Component({
  selector: 'app-incidencesgroup-list',
  templateUrl: './incidencesgroup-list.component.html',
  styleUrls: ['./incidencesgroup-list.component.css'],
})
export class IncidencesgroupListComponent implements OnInit {
  incidencesgroups!: IncidencesGroupCollection;
  pending: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('incidencesgroups').subscribe((incidencesgroups) => {
      this.incidencesgroups = incidencesgroups.incidencesgroups;
      this.pending = incidencesgroups.pending;
    });

    if (this.incidencesgroups.meta === null)
      this.store.dispatch(
        incidencesActions.loadIncidencesGroups({ page: '1' })
      );
  }

  loadpage(page: string) {
    this.store.dispatch(incidencesActions.loadIncidencesGroups({ page }));
  }
}
