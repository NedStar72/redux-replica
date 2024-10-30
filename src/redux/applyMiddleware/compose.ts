type Func<T extends any[], R> = (...a: T) => R;

interface Compose {
  <R>(a: R): R;
  <F extends Function>(f: F): F;
  <A, T extends any[], R>(f1: (a: A) => R, f2: Func<T, A>): Func<T, R>;
  <A, B, T extends any[], R>(f1: (b: B) => R, f2: (a: A) => B, f3: Func<T, A>): Func<T, R>;
  <A, B, C, T extends any[], R>(
    f1: (c: C) => R,
    f2: (b: B) => C,
    f3: (a: A) => B,
    f4: Func<T, A>,
  ): Func<T, R>;
  <R>(f1: (a: any) => R, ...funcs: Function[]): (...args: any[]) => R;
  <R>(...funcs: Function[]): (...args: any[]) => R;
}

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
      (...args: any) =>
        a(b(...args)),
  );
}) as Compose;

export default compose;
