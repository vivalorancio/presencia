import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import {
  Incidence,
  IncidenceCollection,
} from 'src/app/shared/models/incidence.model';

import * as incidencesActions from '../../actions';

@Component({
  selector: 'app-incidence-list',
  templateUrl: './incidence-list.component.html',
  styleUrls: ['./incidence-list.component.css'],
})
export class IncidenceListComponent implements OnInit {
  incidences!: IncidenceCollection;
  pending: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('incidences').subscribe((incidences) => {
      this.incidences = incidences.incidences;
      this.pending = incidences.pending;
    });

    if (this.incidences.meta === null)
      this.store.dispatch(incidencesActions.loadIncidences({ page: '1' }));
  }

  getTextColourFromName = getTextColourFromName;

  deleteIncidence(id: number) {
    this.store.dispatch(incidencesActions.deleteIncidence({ id }));
  }

  firstpage() {
    this.store.dispatch(incidencesActions.loadIncidences({ page: '1' }));
  }
  previouspage() {
    this.store.dispatch(
      incidencesActions.loadIncidences({
        page: `${this.incidences.meta?.current_page - 1}`,
      })
    );
  }
  nextpage() {
    this.store.dispatch(
      incidencesActions.loadIncidences({
        page: `${this.incidences.meta?.current_page + 1}`,
      })
    );
  }
  lastpage() {
    this.store.dispatch(
      incidencesActions.loadIncidences({
        page: this.incidences.meta?.last_page,
      })
    );
  }
}
