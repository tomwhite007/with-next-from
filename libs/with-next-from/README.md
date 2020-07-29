# WithNextFrom custom RxJs operator

The `withNextFrom` RxJs operator is designed to behave in a similar way to the standard RxJs operator, `withLatestFrom`, but without the problem described below. It can be treated as a drop in replacement for the original operator that particularly benefits [Angular](https://angular.io/) developers using scaffolded unit tests the follow Angular standard / best practices.

**Note:** `withNextFrom` does not complete immediately when the source stream completes if it's already waiting for the parameter stream's next values. It will wait until all of the parameter streams fire their next value before completing. So operators like `first()` or `take()` can be applied to the source stream without impacting the resulting output.

![]()

<img src="https://angular2bes.firebaseapp.com/assets/images/withNextFrom-diagram.png"
     alt="withNextFrom marbles diagram"
     style="max-width: 800px;" />

## Usage

```Typescript
  stream1$.pipe(
      withNextFrom(
        () => stream2$,
        () => stream3$,
        () => stream4$,
        // ...more stream args...
      )
    ).subscribe(result => {
      console.log(result); // [s1,s2,s3,s4]
    });
```

## Parameters

Unlike `withLatestFrom`, this new operator `withNextFrom` requires each parameter to be a _function_ that returns an Observable, as opposed to a pure Observable. This is to allow the closure function in the RxJs operator to not block the unit test run-time 'mockability'.

## A patch for withLatestFrom's Angular Unit Test mocking problem

There is an unexpected behaviour from the `RxJs` pipe operator, `withLatestFrom`, when its results are mocked within a test _after_ the TestBed module has been loaded.

`withLatestFrom` mocking _on initialisation_ inside the `beforeEach()` of a .spec file works fine. But this is really considered bad practice because it separates the test case mocked values from the unit test.

This alternative operator, `withNextFrom` serves a similar purpose as `withLatestFrom`, but doesn't need to be aware of the observable stream's history because it's only interested in the next value (or current one, in the case of Behaviour Subject).
