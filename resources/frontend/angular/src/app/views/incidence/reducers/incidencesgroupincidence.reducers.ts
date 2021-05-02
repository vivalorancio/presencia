import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  IncidencesGroupIncidence,
  IncidencesGroupIncidenceCollection,
} from 'src/app/shared/models/incidence.model';
import * as incidencesActions from '../actions';

export interface IncidencesGroupIncidencesState {
  error: string | null;
  page: string;
  pending: boolean;
  incidencesgroup_id: number;
  incidencesgroupincidences: IncidencesGroupIncidenceCollection;
}

export const initialIncidencesGroupIncidencesState: IncidencesGroupIncidencesState = {
  error: null,
  page: '',
  pending: false,
  incidencesgroup_id: -1,
  incidencesgroupincidences: { data: [], links: null, meta: null },
};

export const _incidencesgroupincidencesReducer = createReducer(
  initialIncidencesGroupIncidencesState,
  on(
    incidencesActions.loadIncidencesGroupIncidences,
    (state, { incidencesgroup_id, page }) => ({
      ...state,
      page,
      pending: true,
      incidencesgroup_id,
    })
  ),
  on(
    incidencesActions.loadIncidencesGroupIncidencesSuccess,
    (state, { incidencesgroupincidences }) => ({
      ...state,
      error: null,
      pending: false,
      incidencesgroupincidences,
    })
  ),
  on(
    incidencesActions.loadIncidencesGroupIncidencesFailure,
    (state, { error }) => ({
      ...initialIncidencesGroupIncidencesState,
      error,
    })
  ),
  on(incidencesActions.addIncidencesGroupIncidence, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    incidencesActions.addIncidencesGroupIncidenceSuccess,
    (state, { incidencesgroupincidence }) => ({
      ...state,
      pending: false,
      error: null,
    })
  ),
  on(
    incidencesActions.addIncidencesGroupIncidenceFailure,
    (state, { error }) => ({
      ...state,
      pending: false,
      error,
    })
  ),
  on(incidencesActions.deleteIncidencesGroupIncidence, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    incidencesActions.deleteIncidencesGroupIncidenceSuccess,
    (state, { message }) => ({
      ...state,
      pending: false,
      error: null,
    })
  ),
  on(
    incidencesActions.deleteIncidencesGroupIncidenceFailure,
    (state, { error }) => ({
      ...state,
      pending: false,
      error,
    })
  )
);

export function incidencesgroupincidencesReducer(state: any, action: any) {
  return _incidencesgroupincidencesReducer(state, action);
}
