import {
  Observable,
  of,
  zip,
  Subject,
  onErrorResumeNext,
  throwError,
} from 'rxjs';
import { take, switchMap, first, map } from 'rxjs/operators';

export const withNextFrom = <N>(...args: Array<() => Observable<N>>) => <O>(
  source$: Observable<O>
) =>
  new Observable((observer) => {
    let currentSourceValue: any;

    // return source$
    //   .pipe(
    //     switchMap((o) => {
    //       currentSourceValue = o;
    //       return zip(of(o), ...args.map((f) => f().pipe(first())));
    //     })
    //   )
    //   .subscribe({
    //     next(res) {
    //       observer.next(res);
    //     },
    //     error(err) {
    //       observer.error(err);
    //     },
    //     complete() {
    //       observer.complete();
    //     },
    //   });

    return onErrorResumeNext(
      source$.pipe(
        switchMap((o) => {
          currentSourceValue = o;
          return zip(of(o), ...args.map((f) => f().pipe(first())));
        })
      ),
      currentSourceValue !== undefined
        ? zip(of(currentSourceValue), ...args.map((f) => f().pipe(first())))
        : of()
    ).subscribe({
      next(res) {
        observer.next(res);
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      },
    });
  });
