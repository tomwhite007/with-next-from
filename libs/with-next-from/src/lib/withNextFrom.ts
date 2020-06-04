import { Observable, isObservable } from 'rxjs';
import { take } from 'rxjs/operators';

export const withNextFrom = <N>(...args: Array<() => Observable<N>>) => <O>(
  source$: Observable<O>
) =>
  new Observable<any[]>((observer) => {
    return source$.subscribe({
      next(o) {
        let streamCount = 0;
        const result: any[] = [o];
        args.forEach((getNextStream: () => Observable<N>, argIndex: number) => {
          getNextStream()
            .pipe(take(1))
            .subscribe({
              next(n) {
                streamCount++;
                result[argIndex + 1] = n;
                if (streamCount === args.length) observer.next(result);
              },
              error(err) {
                observer.error(err);
              },
            });
        });
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      },
    });
  });
