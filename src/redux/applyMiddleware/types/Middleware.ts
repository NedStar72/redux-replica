import type { Dispatch } from '../../createStore';

export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = unknown> {
  dispatch: D;
  getState: () => S;
}

export interface Middleware<
  DispatchExt = {}, // TODO: see if this can be used in type definition somehow (can't be removed, as is used to get final dispatch type)
  D extends Dispatch = Dispatch,
  S = any,
> {
  (api: MiddlewareAPI<D, S>): (next: (action: unknown) => unknown) => (action: unknown) => unknown;
}
