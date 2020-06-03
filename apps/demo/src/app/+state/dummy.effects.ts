import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromDummy from './dummy.reducer';
import * as DummyActions from './dummy.actions';
import { Store } from '@ngrx/store';
import { dummyStateQuery } from './dummy.selectors';
import { withNextFrom } from '@with-next-from/with-next-from';

@Injectable()
export class DummyEffects {
  checkListLengthWithLatest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DummyActions.CheckList),
      withLatestFrom(this.store.select(dummyStateQuery.getList)),
      map(([action, list]) =>
        DummyActions.SetListIsLong({ isLong: list.length > 1 })
      )
    )
  );

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
