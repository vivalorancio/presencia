import { createReducer, on } from '@ngrx/store';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import { RequestCollection } from 'src/app/shared/models/request.model';
import { DisplayRequestsCollection } from 'src/app/shared/models/resource.model';
import * as employeesActions from '../actions';

export interface RequestsState {
  error: string | null;
  pending: boolean;
  employee_id: number;
  display: DisplayRequestsCollection;
  requests: RequestCollection;
}

export const initialRequestsState: RequestsState = {
  error: null,
  pending: false,
  employee_id: -1,
  display: {
    page: '1',
    per_page: '25',
    sort_field: 'created_at',
    sort_direction: 'asc',
    type: '',
    status: '',
  },
  requests: { data: [], links: null, meta: null },
};

export const _requestsReducer = createReducer(
  initialRequestsState,
  on(employeesActions.initEmployeeRequests, (state) => ({
    ...initialRequestsState,
  })),
  on(
    employeesActions.loadEmployeeRequests,
    (state, { employee_id, display }) => ({
      ...state,
      pending: true,
      employee_id,
      display,
    })
  ),
  on(employeesActions.loadEmployeeRequestsSuccess, (state, { requests }) => ({
    ...state,
    error: null,
    pending: false,
    requests,
  })),
  on(employeesActions.loadEmployeeRequestsFailure, (state, { error }) => ({
    ...initialRequestsState,
    error,
  })),
  on(employeesActions.initEmployeeSupervisedRequests, (state) => ({
    ...initialRequestsState,
  })),
  on(
    employeesActions.loadEmployeeSupervisedRequests,
    (state, { employee_id, display }) => ({
      ...state,
      pending: true,
      employee_id,
      display,
    })
  ),
  on(
    employeesActions.loadEmployeeSupervisedRequestsSuccess,
    (state, { requests }) => ({
      ...state,
      error: null,
      pending: false,
      requests,
    })
  ),
  on(
    employeesActions.loadEmployeeSupervisedRequestsFailure,
    (state, { error }) => ({
      ...initialRequestsState,
      error,
    })
  )
);

export function requestsReducer(state: any, action: any) {
  return _requestsReducer(state, action);
}
