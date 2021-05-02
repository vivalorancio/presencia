import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  IncidencesGroup,
  IncidencesGroupCollection,
} from 'src/app/shared/models/incidence.model';
import * as incidencesActions from '../actions';

export interface IncidencesGroupsState {
  error: string | null;
  page: string;
  pending: boolean;
  incidencesgroups: IncidencesGroupCollection;
}

export const initialIncidencesGroupsState: IncidencesGroupsState = {
  error: null,
  page: '',
  pending: false,
  incidencesgroups: { data: [], links: null, meta: null },
};

export const _incidencesgroupsReducer = createReducer(
  initialIncidencesGroupsState,
  on(incidencesActions.loadIncidencesGroups, (state, { page }) => ({
    ...state,
    page,
    pending: true,
  })),
  on(
    incidencesActions.loadIncidencesGroupsSuccess,
    (state, { incidencesgroups }) => ({
      ...state,
      error: null,
      pending: false,
      incidencesgroups,
    })
  ),
  on(incidencesActions.loadIncidencesGroupsFailure, (state, { error }) => ({
    ...initialIncidencesGroupsState,
    error,
  })),
  on(incidencesActions.addIncidencesGroup, (state, { incidencesgroup }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    incidencesActions.addIncidencesGroupSuccess,
    (state, { incidencesgroup }) => ({
      ...state,
      pending: false,
      error: null,
    })
  ),
  on(incidencesActions.addIncidencesGroupFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(incidencesActions.updateIncidencesGroup, (state, { incidencesgroup }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    incidencesActions.updateIncidencesGroupSuccess,
    (state, { incidencesgroup }) => ({
      ...state,
      pending: false,
      error: null,
    })
  ),
  on(incidencesActions.updateIncidencesGroupFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(incidencesActions.deleteIncidencesGroup, (state, { id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(incidencesActions.deleteIncidencesGroupSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(incidencesActions.deleteIncidencesGroupFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function incidencesgroupsReducer(state: any, action: any) {
  return _incidencesgroupsReducer(state, action);
}
