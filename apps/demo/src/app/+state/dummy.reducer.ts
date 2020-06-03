import { createReducer, on, Action } from '@ngrx/store';

import * as DummyActions from './dummy.actions';

export const DUMMY_FEATURE_KEY = 'dummy';

export interface DummyState {
  list: string[];
  isLong: boolean;
}

export const initialState: DummyState = {
  list: [],
  isLong: false,
};

const dummyReducer = createReducer(
  initialState,
  on(DummyActions.SetListIsLong, (state, { isLong }) => ({
    ...state,
    isLong,
  }))
);

export function reducer(state: DummyState | undefined, action: Action) {
  return dummyReducer(state, action);
}
