import type { Action } from './Action';
import type { Reducer } from './Reducer';
import type { Store } from './Store';

export type UnknownObject = Record<string, unknown>;

export interface EnhancerStoreCreator<
  Ext extends UnknownObject = {},
  StateExt extends UnknownObject = {},
> {
  <S, A extends Action>(reducer: Reducer<S, A>): Store<S & StateExt, A> & Ext;
}

export interface Enhancer<
  Ext extends UnknownObject = {},
  StateExt extends UnknownObject = {},
> {
  <NextExt extends UnknownObject, NextStateExt extends UnknownObject>(
    next: EnhancerStoreCreator<NextExt, NextStateExt>,
  ): EnhancerStoreCreator<NextExt & Ext, NextStateExt & StateExt>;
}
