import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromDummy from './dummy.reducer';
import * as DummyActions from './dummy.actions';
import { Store } from '@ngrx/store';
import { dummyStateQuery } from './dummy.selectors';
import { withNextFrom } from '@gyrus/ngx-with-next-from';

@Injectable()
export class DummyEffects {
  // example effect using the power of withLatestFrom
  checkListLengthWithLatest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DummyActions.CheckList),
      withLatestFrom(this.store.select(dummyStateQuery.getList)),
      map(([action, list]) =>
        DummyActions.SetListIsLong({ isLong: list.length > 1 })
      )
    )
  );

  // a similar effect using switchMap to allow better mocking in tests
  checkListLengthSwitchMap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DummyActions.CheckList),
      switchMap(() => this.store.select(dummyStateQuery.getList)),
      map((list) => DummyActions.SetListIsLong({ isLong: list.length > 1 }))
    )
  );

  // custom operator withNextFrom still allows good mocking in tests but behaves like withLatestFrom
  checkListLengthWithNext$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DummyActions.CheckList),
      withNextFrom(() => this.store.select(dummyStateQuery.getList)),
      map(([action, list]) =>
        DummyActions.SetListIsLong({ isLong: list.length > 1 })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromDummy.DummyState>
  ) {}
}
