import { createReducer, on } from '@ngrx/store';
import {
  AreaCollection,
  AreaSearch,
} from 'src/app/shared/models/organization.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
import * as organizationActions from '../actions';

export interface AreasState {
  error: string | null;
  display: DisplayResourceCollection;
  search: AreaSearch;
  pending: boolean;
  areas: AreaCollection;
}

export const initialAreaState: AreasState = {
  error: null,
  display: {
    page: '1',
    per_page: '25',
    sort_field: 'code',
    sort_direction: 'asc',
  },
  search: {} as AreaSearch,
  pending: false,
  areas: { data: [], links: null, meta: null },
};

export const _areasReducer = createReducer(
  initialAreaState,
  on(organizationActions.initAreas, (state) => ({
    ...initialAreaState,
  })),
  on(organizationActions.loadAreas, (state, { display, search }) => ({
    ...state,
    display,
    search,
    pending: true,
  })),
  on(organizationActions.loadAreasSuccess, (state, { areas }) => ({
    ...state,
    error: null,
    pending: false,
    areas,
  })),
  on(organizationActions.loadAreasFailure, (state, { error }) => ({
    ...initialAreaState,
    error,
  })),
  on(organizationActions.addArea, (state, { area }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(organizationActions.addAreaSuccess, (state, { area }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(organizationActions.addAreaFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(organizationActions.updateArea, (state, { area }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(organizationActions.updateAreaSuccess, (state, { area }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(organizationActions.updateAreaFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(organizationActions.deleteArea, (state, { id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(organizationActions.deleteAreaSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(organizationActions.deleteAreaFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function areasReducer(state: any, action: any) {
  return _areasReducer(state, action);
}
