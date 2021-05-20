import { createReducer, on } from '@ngrx/store';
import {
  SupervisionGroupCollection,
  SupervisionGroupSearch,
} from 'src/app/shared/models/organization.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
import * as organizationActions from '../actions';

export interface SupervisionGroupsState {
  error: string | null;
  display: DisplayResourceCollection;
  search: SupervisionGroupSearch;
  pending: boolean;
  supervisiongroups: SupervisionGroupCollection;
}

export const initialSupervisionGroupState: SupervisionGroupsState = {
  error: null,
  display: {
    page: '1',
    per_page: '25',
    sort_field: 'code',
    sort_direction: 'asc',
  },
  search: {} as SupervisionGroupSearch,
  pending: false,
  supervisiongroups: { data: [], links: null, meta: null },
};

export const _supervisiongroupsReducer = createReducer(
  initialSupervisionGroupState,
  on(organizationActions.initSupervisionGroups, (state) => ({
    ...initialSupervisionGroupState,
  })),
  on(
    organizationActions.loadSupervisionGroups,
    (state, { display, search }) => ({
      ...state,
      display,
      search,
      pending: true,
    })
  ),
  on(
    organizationActions.loadSupervisionGroupsSuccess,
    (state, { supervisiongroups }) => ({
      ...state,
      error: null,
      pending: false,
      supervisiongroups,
    })
  ),
  on(organizationActions.loadSupervisionGroupsFailure, (state, { error }) => ({
    ...initialSupervisionGroupState,
    error,
  })),
  on(
    organizationActions.addSupervisionGroup,
    (state, { supervisiongroup }) => ({
      ...state,
      pending: true,
      error: null,
    })
  ),
  on(
    organizationActions.addSupervisionGroupSuccess,
    (state, { supervisiongroup }) => ({
      ...state,
      pending: false,
      error: null,
    })
  ),
  on(organizationActions.addSupervisionGroupFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(
    organizationActions.updateSupervisionGroup,
    (state, { supervisiongroup }) => ({
      ...state,
      pending: true,
      error: null,
    })
  ),
  on(
    organizationActions.updateSupervisionGroupSuccess,
    (state, { supervisiongroup }) => ({
      ...state,
      pending: false,
      error: null,
    })
  ),
  on(organizationActions.updateSupervisionGroupFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(organizationActions.deleteSupervisionGroup, (state, { id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    organizationActions.deleteSupervisionGroupSuccess,
    (state, { message }) => ({
      ...state,
      pending: false,
      error: null,
    })
  ),
  on(organizationActions.deleteSupervisionGroupFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function supervisiongroupsReducer(state: any, action: any) {
  return _supervisiongroupsReducer(state, action);
}
