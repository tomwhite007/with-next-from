import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DUMMY_FEATURE_KEY, DummyState } from './dummy.reducer';

// Lookup the 'Dummy' feature state managed by NgRx
export const getDummyState = createFeatureSelector<DummyState>(
  DUMMY_FEATURE_KEY
);

export const getList = createSelector(
  getDummyState,
  (state: DummyState) => state.list
);

export const getIsLong = createSelector(
  getDummyState,
  (state: DummyState) => state.isLong
);

export const dummyStateQuery = {
  getList,
  getIsLong,
};
