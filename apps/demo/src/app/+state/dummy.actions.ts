import { createAction, props } from '@ngrx/store';

export const CheckList = createAction('[Dummy] Check List');

export const SetListIsLong = createAction(
  '[Dummy] Set List Is Long',
  props<{ isLong: boolean }>()
);
