import { createReducer, on } from '@ngrx/store';
import { SupervisionGroupSupervisorCollection } from 'src/app/shared/models/organization.model';
import * as organizationActions from '../actions';

export interface SupervisionGroupSupervisorsState {
  error: string | null;
  page: string;
  pending: boolean;
  supervisiongroup_id: number;
  supervisiongroupsupervisors: SupervisionGroupSupervisorCollection;
}

export const initialSupervisionGroupSupervisorsState: SupervisionGroupSupervisorsState =
  {
    error: null,
    page: '',
    pending: false,
    supervisiongroup_id: -1,
    supervisiongroupsupervisors: { data: [], links: null, meta: null },
  };

export const _supervisiongroupsupervisorsReducer = createReducer(
  initialSupervisionGroupSupervisorsState,
  on(
    organizationActions.loadSupervisionGroupSupervisors,
    (state, { supervisiongroup_id, page }) => ({
      ...state,
      page,
      pending: true,
      supervisiongroup_id,
    })
  ),
  on(
    organizationActions.loadSupervisionGroupSupervisorsSuccess,
    (state, { supervisiongroupsupervisors }) => ({
      ...state,
      error: null,
      pending: false,
      supervisiongroupsupervisors,
    })
  ),
  on(
    organizationActions.loadSupervisionGroupSupervisorsFailure,
    (state, { error }) => ({
      ...initialSupervisionGroupSupervisorsState,
      error,
      pending: false,
    })
  ),
  on(organizationActions.addSupervisionGroupSupervisor, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    organizationActions.addSupervisionGroupSupervisorSuccess,
    (state, { supervisiongroupsupervisor }) => ({
      ...state,
      pending: false,
      error: null,
    })
  ),
  on(
    organizationActions.addSupervisionGroupSupervisorFailure,
    (state, { error }) => ({
      ...state,
      pending: false,
      error,
    })
  ),
  on(organizationActions.deleteSupervisionGroupSupervisor, (state) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    organizationActions.deleteSupervisionGroupSupervisorSuccess,
    (state, { message }) => ({
      ...state,
      pending: false,
      error: null,
    })
  ),
  on(
    organizationActions.deleteSupervisionGroupSupervisorFailure,
    (state, { error }) => ({
      ...state,
      pending: false,
      error,
    })
  )
);

export function supervisiongroupsupervisorsReducer(state: any, action: any) {
  return _supervisiongroupsupervisorsReducer(state, action);
}
