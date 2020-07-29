import { hot, cold } from '@nrwl/angular/testing';
import { withNextFrom } from './withNextFrom';
import { withLatestFrom } from 'rxjs/operators';

describe('withNextFrom', () => {
  // prettier-ignore
  it('should pick the next available value from each stream after the originating stream value occurs', () => {
    const e1$ =      cold('-----a----------|');
    const e2$ =       hot('--b-----c---d------|');
    const e3$ =       hot('e------f---g---h------|');
    const e4$ =      cold('--(i|)');
    const expected = cold('--------x-------|', {
      x: ['a', 'c', 'f', 'i'],
    });

    const result = e1$.pipe(
      withNextFrom(
        () => e2$,
        () => e3$,
        () => e4$
      )
    );

    expect(result).toBeObservable(expected);
  });

  // prettier-ignore
  it('should continue to wait for parameter streams to complete if originator stream completes', () => {
    const e1$ =      cold('-----a|');
    const e2$ =       hot('--b-----c---d------|');
    const e3$ =       hot('e------f---g---h------|');
    const e4$ =      cold('--(i|)');
    const expected = cold('--------(x|)', {
      x: ['a', 'c', 'f', 'i'],
    });

    const result = e1$.pipe(
      withNextFrom(
        () => e2$,
        () => e3$,
        () => e4$
      )
    );

    expect(result).toBeObservable(expected);
  });

  // prettier-ignore
  it('should complete with no result', () => {
    const e1$ =      cold('-----|');
    const e2$ =       hot('--b-----c---d------|');
    const e3$ =       hot('e------f---g---h------|');
    const e4$ =      cold('--(i|)');
    const expected = cold('-----|');

    const result = e1$.pipe(
      withNextFrom(
        () => e2$,
        () => e3$,
        () => e4$
      )
    );

    expect(result).toBeObservable(expected);
  });

  // prettier-ignore
  it('should error with no result', () => {
    const e1$ =      cold('-----#');
    const e2$ =       hot('--b-----c---d------|');
    const e3$ =       hot('e------f---g---h------|');
    const e4$ =      cold('--(i|)');
    const expected = cold('-----#');

    const result = e1$.pipe(
      withNextFrom(
        () => e2$,
        () => e3$,
        () => e4$
      )
    );

    expect(result).toBeObservable(expected);
  });

  // prettier-ignore
  it('should fire two arrays and complete on the last', () => {
    const e1$ =      cold('-----a------b--|');
    const e2$ =       hot('------c------d------|');
    const e3$ =       hot('e------f---g---h------|');
    const e4$ =      cold('-----i----------j---|');
    const expected = cold('----------x------(y|)', {
      x: ['a', 'c', 'f', 'i'],
      y: ['b', 'd', 'h', 'i'],
    });

    const result = e1$.pipe(
      withNextFrom(
        () => e2$,
        () => e3$,
        () => e4$
      )
    );

    expect(result).toBeObservable(expected);
  });

  // prettier-ignore
  it('should fire one array, skip the second (incomplete array) trigger and fire a final array', () => {
    const e1$ =      cold('-----a----b--c--|');
    const e2$ =       hot('------d-----e---f---|');
    const e3$ =       hot('------g-----h----i------|');
    const e4$ =       hot('-------j----------k---|');
    const expected = cold('-------x----------(y|)', {
      x: ['a', 'd', 'g', 'j'],
      y: ['c', 'f', 'i', 'k'],
    });

    const result = e1$.pipe(
      withNextFrom(
        () => e2$,
        () => e3$,
        () => e4$
      )
    );

    expect(result).toBeObservable(expected);
  });

  describe('contrast with withLatestFrom operator', () => {
    // prettier-ignore
    it('should complete because withLatestFrom completes when the source does', () => {
      const e1$ =      cold('-----a|');
      const e2$ =       hot('--b-------------d------|');
      const e3$ =       hot('e--------------g---h------|');
      const e4$ =      cold('-------i|');
      const expected = cold('------|');

      const result = e1$.pipe(
        withLatestFrom(
          e2$,
          e3$,
          e4$
        )
      );

      expect(result).toBeObservable(expected);
    });
  });
});
