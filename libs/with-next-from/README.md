# WithNextFrom custom RxJs operator

The `withNextFrom` RxJs operator is designed to behave in a similar way to the standard RxJs operator, `withLatestFrom`, but without the problem described below. It can be treated as a drop in replacement for the original operator that particullarly benefits [Angular](https://angular.io/) developers using scaffolded unit tests the follow Angular standard / best practices.

# A patch for withLatestFrom's Angular Unit Test mocking problem

There is an unexpected behaviour from the `RxJs` pipe operator, `withLatestFrom`, when its results are mocked within a test _after_ the TestBed module has been loaded.

`withLatestFrom` mocking _on initialisation_ inside the `beforeEach()` of a .spec file works fine. But this is really considered bad practice because it separates the test case mocked values from the unit test.

This alternative operator, `withNextFrom` serves a similar purpose as `withLatestFrom`, but doesn't need to be aware of the observable stream's history because it's only interested in the next value (or current one, in the case of Behaviour Subject).
