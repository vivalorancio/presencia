import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import {
  Incidence,
  IncidenceCollection,
  IncidenceSearch,
  IncidencesGroup,
  IncidencesGroupCollection,
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

  incidencesgroupincidences!: IncidencesGroupIncidenceCollection;
  pending: boolean = false;
  submiterror: any;

  incidences!: IncidenceCollection;
  pending_incidences: boolean = false;
  availableincidences!: Incidence[];
  incidencesgroup_id!: number;

  incidencesgroups!: IncidencesGroupCollection;
  pending_incidencesgroups: boolean = false;
  incidencesgroup: IncidencesGroup = {} as IncidencesGroup;

  selectedIncidenceId: number = -1;
  submitted: boolean = false;

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

    //if (this.incidences.meta === null)
    this.store.dispatch(
      incidencesActions.loadIncidences({
        display: {
          page: '1',
          per_page: '10000',
          sort_field: 'code',
          sort_direction: 'asc',
        },
        search: {} as IncidenceSearch,
      })
    );

    this.store.select('incidences').subscribe((incidences) => {
      this.incidences = incidences.incidences;
      this.pending_incidences = incidences.pending;
    });

    this.store.select('incidencesgroups').subscribe((incidencesgroups) => {
      this.incidencesgroups = incidencesgroups.incidencesgroups;
      this.pending_incidencesgroups = incidencesgroups.pending;
    });

    this.route.params.subscribe((params) => {
      this.incidencesgroup_id = +params.incidencesgroup_id;
      const the_incidencesgroup: any = (this.incidencesgroups?.data.find(
        (incidencesgroup: any) => incidencesgroup.id === this.incidencesgroup_id
      ) || {}) as IncidencesGroup;
      if (the_incidencesgroup !== {}) {
        this.incidencesgroup = the_incidencesgroup;
      }

      this.store.dispatch(
        incidencesActions.loadIncidencesGroupIncidences({
          incidencesgroup_id: this.incidencesgroup_id,
          page: '1',
        })
      );
    });

    this.submitted = false;

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

    this.submitted = true;

    let incidencesgroupincidence = {
      incidence_id: this.selectedIncidenceId,
    } as IncidencesGroupIncidence;

    this.store.dispatch(
      incidencesActions.addIncidencesGroupIncidence({
        incidencesgroup_id: this.incidencesgroup_id,
        incidencesgroupincidence,
      })
    );

    this.selectedIncidenceId = -1;
  }

  removeIncidence(incidencesgroupincidence_id: number) {
    this.store.dispatch(
      incidencesActions.deleteIncidencesGroupIncidence({
        incidencesgroup_id: this.incidencesgroup_id,
        incidencesgroupincidence_id,
      })
    );
  }
  getSubmitErrorDescription(): string {
    let error: string = '';
    if (this.submitted && this.submiterror?.error) {
      Object.entries(this.submiterror.error.errors).forEach((item: any) => {
        item[1].forEach((err: string) => (error += err + ' '));
      });
    }
    return error;
  }

  acceptError() {
    this.submitted = false;
  }

  loadpage(page: string) {
    this.store.dispatch(
      incidencesActions.loadIncidencesGroupIncidences({
        incidencesgroup_id: this.incidencesgroup_id,
        page,
      })
    );
  }
}
