import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import {
  Incidence,
  IncidenceCollection,
  IncidencesGroupIncidence,
  IncidencesGroupIncidenceCollection,
} from 'src/app/shared/models/incidence.model';

import * as incidencesActions from '../../actions';

@Component({
  selector: 'app-incidencesgroupincidence-list',
  templateUrl: './incidencesgroupincidence-list.component.html',
  styleUrls: ['./incidencesgroupincidence-list.component.css'],
})
export class IncidencesgroupincidenceListComponent implements OnInit {
  incidencesgroupincidenceForm!: FormGroup;

  incidencesgroup_id!: number;

  incidencesgroupincidences!: IncidencesGroupIncidenceCollection;
  pending: boolean = false;

  incidences!: IncidenceCollection;
  pending_incidences: boolean = false;
  availableincidences!: Incidence[];

  selectedIncidenceId: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('incidencesgroupincidences')
      .subscribe((incidencesgroupincidences) => {
        this.incidencesgroupincidences =
          incidencesgroupincidences.incidencesgroupincidences;
        this.pending = incidencesgroupincidences.pending;
        this.availableincidences = this.getAvailableIncidences();
        this.selectedIncidenceId = -1;
      });

    this.store.select('incidences').subscribe((incidences) => {
      this.incidences = incidences.incidences;
      this.pending_incidences = incidences.pending;
    });

    if (this.incidences.meta === null)
      this.store.dispatch(incidencesActions.loadIncidences({ page: '1' }));

    this.route.params.subscribe((params) => {
      this.incidencesgroup_id = +params.incidencesgroup_id;

      this.store.dispatch(
        incidencesActions.loadIncidencesGroupIncidences({
          incidencesgroup_id: this.incidencesgroup_id,
          page: '1',
        })
      );
    });

    this.incidencesgroupincidenceForm = this.formBuilder.group({
      incidence_id: [],
    });
  }

  getTextColourFromName = getTextColourFromName;

  getIncidence(incidence_id: number): Incidence {
    return (
      this.incidences.data.find((incidence) => incidence.id === incidence_id) ||
      ({} as Incidence)
    );
  }

  getAvailableIncidences(): Incidence[] {
    return this.incidences?.data.filter((incidence) => {
      return (
        this.incidencesgroupincidences?.data.find(
          (incidencesgroupincidence) =>
            incidencesgroupincidence.incidence_id === incidence.id
        ) === undefined
      );
    });
  }

  addIncidence() {
    if (this.selectedIncidenceId === -1) return;

    let incidencesgroupincidence = {
      incidence_id: this.selectedIncidenceId,
    } as IncidencesGroupIncidence;
    this.store.dispatch(
      incidencesActions.addIncidencesGroupIncidence({
        incidencesgroup_id: this.incidencesgroup_id,
        incidencesgroupincidence,
      })
    );
  }

  deleteIncidence(incidencesgroupincidence_id: number) {
    this.store.dispatch(
      incidencesActions.deleteIncidencesGroupIncidence({
        incidencesgroup_id: this.incidencesgroup_id,
        incidencesgroupincidence_id,
      })
    );
  }

  firstpage() {
    this.store.dispatch(
      incidencesActions.loadIncidencesGroupIncidences({
        incidencesgroup_id: this.incidencesgroup_id,
        page: '1',
      })
    );
  }
  previouspage() {
    this.store.dispatch(
      incidencesActions.loadIncidencesGroupIncidences({
        incidencesgroup_id: this.incidencesgroup_id,
        page: `${this.incidencesgroupincidences.meta?.current_page - 1}`,
      })
    );
  }
  nextpage() {
    this.store.dispatch(
      incidencesActions.loadIncidencesGroupIncidences({
        incidencesgroup_id: this.incidencesgroup_id,
        page: `${this.incidencesgroupincidences.meta?.current_page + 1}`,
      })
    );
  }
  lastpage() {
    this.store.dispatch(
      incidencesActions.loadIncidencesGroupIncidences({
        incidencesgroup_id: this.incidencesgroup_id,
        page: this.incidencesgroupincidences.meta?.last_page,
      })
    );
  }
}
