import { hot, cold } from '@nrwl/angular/testing';
import { withNextFrom } from './withNextFrom';

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
});
