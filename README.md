# WithNextFrom operator

Library code for the custom RxJs operator, `withNextFrom` npm library [in this sub folder](/libs/with-next-from)

`withNextFrom` is designed to behave in a similar way to the standard RxJs operator, `withLatestFrom`, but without the issue described below. It can be treated as a drop in replacement for the original operator that particullarly benefits [Angular](https://angular.io/) developers using scaffolded unit tests that follow accepted Angular best practices.

This project was generated using [Nx](https://nx.dev).

# withLatestFrom Unit Test mocking issue

I created this project to demonstrate unexpected behaviour from the `RxJs` pipe operator, `withLatestFrom`, when its results are mocked within a test _after_ the TestBed module has been loaded.

To prove this, I've created to NgRx effects that do the same job; one using `withLatestFrom` and one using `switchMap` (see file: [dummy-state.effects.spec.ts](apps\demo\src\app+state\dummy.effects.ts)). I have then created two identical unit tests that mock the method that returns the observable within them (see file: [dummy-state.effects.ts](apps\demo\src\app+state\dummy.effects.spec.ts)).

To solve the problem, whilst retaining the benefits of `withLatestFrom`, I've created my own operator `withNextFrom` which serves the same purpose for me as `withLatestFrom`, but doesn't need to be aware of the observable stream's history because it's only interested in the next value (or current one, in the case of Behaviour Subject).

## History

I first noticed this when trying to create a demo using RxJs Marbles Testing library. I couldn't understand why my production effects could use Marbles and mocking inside each test, but my demo project could only be mocked on initialisation (rather than inside each test). After removing everything piece by piece, I found that the only difference in my Marbles test cases was that my demo NgRx effects were using `withLatestFrom`.

I found that `withLatestFrom` mocking _on initialisation_ inside the `beforeEach()` of a .spec file works fine. But this is really considered bad practice because it separates the test case mocked values from the unit test

I created an issue about this on the RxJs repo: [Mocking input to withLatestFrom inside NgRx Effects tests fails when using Angular best practice #5159](https://github.com/ReactiveX/rxjs/issues/5159)

## Getting started

Use `npm install` to get dependencies.

## Running unit tests

Run `ng test` to execute the unit tests in [Jest](https://jestjs.io/).

### Deployment notes

ng build with-next-from --prod
cd dist/libs/with-next-from
sudo npm publish --access public
