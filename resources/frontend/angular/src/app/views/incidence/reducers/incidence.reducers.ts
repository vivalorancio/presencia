import { createReducer, on } from '@ngrx/store';
import {
  IncidenceCollection,
  IncidenceSearch,
} from 'src/app/shared/models/incidence.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
import * as incidencesActions from '../actions';

export interface IncidencesState {
  error: string | null;
  display: DisplayResourceCollection;
  search: IncidenceSearch;
  pending: boolean;
  incidences: IncidenceCollection;
}

export const initialState: IncidencesState = {
  error: null,
  display: {
    page: '1',
    per_page: '25',
    sort_field: 'code',
    sort_direction: 'asc',
  },
  search: {} as IncidenceSearch,
  pending: false,
  incidences: { data: [], links: null, meta: null },
};

export const _incidencesReducer = createReducer(
  initialState,
  on(incidencesActions.initIncidences, (state) => ({ ...initialState })),
  on(incidencesActions.loadIncidences, (state, { display, search }) => ({
    ...state,
    display,
    search,
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
