/* eslint-disable @typescript-eslint/no-unsafe-function-type */

interface Compose {
  <R>(r: R): R;
  <T extends unknown[], R>(f: Func<T, R>): Func<T, R>;
  <A, T extends unknown[], R>(f1: (a: A) => R, f2: Func<T, A>): Func<T, R>;
  <A, B, T extends unknown[], R>(f1: (b: B) => R, f2: (a: A) => B, f3: Func<T, A>): Func<T, R>;
  <A, B, C, T extends unknown[], R>(
    f1: (c: C) => R,
    f2: (b: B) => C,
    f3: (a: A) => B,
    f4: Func<T, A>,
  ): Func<T, R>;
  <R>(f1: (a: unknown) => R, ...funcs: Function[]): (...args: unknown[]) => R;
  <R>(...funcs: Function[]): (...args: unknown[]) => R;
}

/**
 * compose(a,b,c) -> (..args) => a(b(c(...args)))
 */
const compose = ((...funcs: Function[]) => {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args: unknown[]) =>
        a(b(...args)),
  );
}) as Compose;

export default compose;
