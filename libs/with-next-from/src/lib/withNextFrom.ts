import { Observable, of, zip } from 'rxjs';
import { take, switchMap, first } from 'rxjs/operators';

export const withNextFrom = <N>(...args: Array<() => Observable<N>>) => <O>(
  source$: Observable<O>
) =>
  new Observable((observer) => {
    return source$
      .pipe(switchMap((o) => zip(of(o), ...args.map((f) => f().pipe(first())))))
      .subscribe({
        next(o) {
          observer.next(o);
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });
  });
