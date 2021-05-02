import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  Incidence,
  IncidenceCollection,
} from 'src/app/shared/models/incidence.model';
import * as incidencesActions from '../actions';

export interface IncidencesState {
  error: string | null;
  page: string;
  pending: boolean;
  incidences: IncidenceCollection;
}

export const initialState: IncidencesState = {
  error: null,
  page: '',
  pending: false,
  incidences: { data: [], links: null, meta: null },
};

export const _incidencesReducer = createReducer(
  initialState,
  on(incidencesActions.loadIncidences, (state, { page }) => ({
    ...state,
    page,
    pending: true,
  })),
  on(incidencesActions.loadIncidencesSuccess, (state, { incidences }) => ({
    ...state,
    error: null,
    pending: false,
    incidences,
  })),
  on(incidencesActions.loadIncidencesFailure, (state, { error }) => ({
    ...initialState,
    error,
  })),
  on(incidencesActions.addIncidence, (state, { incidence }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(incidencesActions.addIncidenceSuccess, (state, { incidence }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(incidencesActions.addIncidenceFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(incidencesActions.updateIncidence, (state, { incidence }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(incidencesActions.updateIncidenceSuccess, (state, { incidence }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(incidencesActions.updateIncidenceFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(incidencesActions.deleteIncidence, (state, { id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(incidencesActions.deleteIncidenceSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(incidencesActions.deleteIncidenceFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function incidencesReducer(state: any, action: any) {
  return _incidencesReducer(state, action);
}
