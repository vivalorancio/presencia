import { createReducer, on } from '@ngrx/store';
import {
  DepartmentCollection,
  DepartmentSearch,
} from 'src/app/shared/models/organization.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
import * as organizationActions from '../actions';

export interface DepartmentsState {
  error: string | null;
  display: DisplayResourceCollection;
  search: DepartmentSearch;
  pending: boolean;
  departments: DepartmentCollection;
}

export const initialDepartmentState: DepartmentsState = {
  error: null,
  display: {
    page: '1',
    per_page: '25',
    sort_field: 'code',
    sort_direction: 'asc',
  },
  search: {} as DepartmentSearch,
  pending: false,
  departments: { data: [], links: null, meta: null },
};

export const _departmentsReducer = createReducer(
  initialDepartmentState,
  on(organizationActions.initDepartments, (state) => ({
    ...initialDepartmentState,
  })),
  on(organizationActions.loadDepartments, (state, { display, search }) => ({
    ...state,
    display,
    search,
    pending: true,
  })),
  on(organizationActions.loadDepartmentsSuccess, (state, { departments }) => ({
    ...state,
    error: null,
    pending: false,
    departments,
  })),
  on(organizationActions.loadDepartmentsFailure, (state, { error }) => ({
    ...initialDepartmentState,
    error,
  })),
  on(organizationActions.addDepartment, (state, { department }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(organizationActions.addDepartmentSuccess, (state, { department }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(organizationActions.addDepartmentFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(organizationActions.updateDepartment, (state, { department }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(organizationActions.updateDepartmentSuccess, (state, { department }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(organizationActions.updateDepartmentFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(organizationActions.deleteDepartment, (state, { id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(organizationActions.deleteDepartmentSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(organizationActions.deleteDepartmentFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function departmentsReducer(state: any, action: any) {
  return _departmentsReducer(state, action);
}
