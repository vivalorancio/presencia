import { createReducer, on } from '@ngrx/store';
import { Request } from 'src/app/shared/models/request.model';
import * as employeesActions from '../actions';

export interface RequestState {
  error: string | null;
  res: string | null;
  pending: boolean;
  employee_id: number;
}

export const initialrequestState: RequestState = {
  error: null,
  res: null,
  pending: false,
  employee_id: -1,
};

export const _requestReducer = createReducer(
  initialrequestState,
  on(employeesActions.addRequest, (state, { employee_id, request }) => ({
    ...initialrequestState,
    employee_id,
    pending: true,
  })),
  on(employeesActions.addRequestSuccess, (state, { res }) => ({
    ...state,
    pending: false,
    error: null,
    res,
  })),
  on(employeesActions.addRequestFailure, (state, { error }) => ({
    ...state,
    pending: false,
    res: null,
    error,
  })),
  on(employeesActions.updateRequest, (state, { employee_id, request }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(employeesActions.updateRequestSuccess, (state, { res }) => ({
    ...state,
    res,
    pending: false,
    error: null,
  })),
  on(employeesActions.updateRequestFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(employeesActions.deleteRequest, (state, { employee_id, request_id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(employeesActions.deleteRequestSuccess, (state, { message }) => ({
    ...state,
    res: message,
    pending: false,
    error: null,
  })),
  on(employeesActions.deleteRequestFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function requestReducer(state: any, action: any) {
  return _requestReducer(state, action);
}
