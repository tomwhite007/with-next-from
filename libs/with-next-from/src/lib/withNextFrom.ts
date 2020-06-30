import { Observable, of, zip, concat } from 'rxjs';
import { switchMap, first, tap } from 'rxjs/operators';

export const withNextFrom = <N>(...args: Array<() => Observable<N>>) => <O>(
  source$: Observable<O>
) =>
  new Observable((observer) => {
    let inFlight = false;
    let currentSourceValue: O;
    let argsResults: N[] = [];
    const clearCache = () => {
      inFlight = false;
      currentSourceValue = undefined;
      argsResults = [];
    };

    return concat(
      source$
        .pipe(
          switchMap((o) => {
            inFlight = true;
            currentSourceValue = o;

            return zip(
              of(o),
              ...args.map((f, idx) =>
                f().pipe(
                  first(),
                  // cache result in case source completes
                  tap((n) => (argsResults[idx] = n))
                )
              )
            );
          })
        )
        .pipe(tap(clearCache)),

      inFlight
        ? // pickup where previous zip left off
          zip(
            of(currentSourceValue),
            ...args.map((f, idx) =>
              argsResults[idx] !== undefined
                ? of(argsResults[idx])
                : f().pipe(first())
            )
          ).pipe(tap(clearCache))
        : // complete immediately
          of()
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
