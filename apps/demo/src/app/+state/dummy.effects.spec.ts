import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from '@nrwl/angular/testing';
import { DummyEffects } from './dummy.effects';
import * as DummyActions from './dummy.actions';
import { Store, Action } from '@ngrx/store';

describe('DummyEffects', () => {
  let actions$: Observable<Action>;
  let effects: DummyEffects;
  const storeSpy = {
    select: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DummyEffects,
        provideMockActions(() => actions$),
        { provide: Store, useValue: storeSpy },
      ],
    });

    effects = TestBed.get(DummyEffects);
  });

  /**
   * This test will fail, because `withLatestFrom` doesn't allow mocking of a
   * parameter stream after the initial stream (the effect), has been created
   * in the TestBed.configureTestingModule()
   **/
  it('should trigger SetListIsLong - using withLatestFrom', () => {
    storeSpy.select.mockReturnValue(cold('a', { a: ['testA', 'testB'] }));

    actions$ = hot('-a-|', {
      a: DummyActions.CheckList(),
    });

    expect(effects.checkListLengthWithLatest$).toBeObservable(
      cold('-a', {
        a: DummyActions.SetListIsLong({ isLong: true }),
      })
    );
  });

  it('should trigger SetListIsLong - using switchMap', () => {
    storeSpy.select.mockReturnValue(cold('(a|)', { a: ['testX', 'testY'] }));

    actions$ = hot('-a-|', {
      a: DummyActions.CheckList(),
    });

    expect(effects.checkListLengthSwitchMap$).toBeObservable(
      cold('-a-|', {
        a: DummyActions.SetListIsLong({ isLong: true }),
      })
    );
  });

  it('should trigger SetListIsLong - using withNextFrom', () => {
    storeSpy.select.mockReturnValue(cold('(a|)', { a: ['test1', 'test2'] }));

    actions$ = hot('-a-|', {
      a: DummyActions.CheckList(),
    });

    expect(effects.checkListLengthWithNext$).toBeObservable(
      cold('-a-|', {
        a: DummyActions.SetListIsLong({ isLong: true }),
      })
    );
  });
});
