import { randomString } from '../utils';
import type { Action } from './types/Action';
import type { Dispatch } from './types/Dispatch';
import type { Reducer } from './types/Reducer';
import type { Listener, Store, Unsubscribe } from './types/Store';
import type { Enhancer, UnknownObject } from './types/Enhancer';

export const InternalActionTypes = {
  Initial: `@@redux/INIT${randomString()}`,
};

const createStore = <
  S,
  A extends Action,
  Ext extends UnknownObject = {},
  StateExt extends UnknownObject = {},
>(
  reducer: Reducer<S, A>,
  enhancer?: Enhancer<Ext, StateExt>,
): Store<S & StateExt, A> & Ext => {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let state: S | undefined;
  let listeners: Map<number, Listener> = new Map();
  let listenerIdCounter = 0;

  const dispatch = (action: A): A => {
    try {
      state = reducer(state, action);

      listeners.forEach(listener => {
        listener();
      });
    } catch {}

    return action;
  };

  const getState = (): S => {
    return state as S;
  };

  const subscribe = (listener: Listener): Unsubscribe => {
    const listenerId = listenerIdCounter++;
    listeners.set(listenerId, listener);

    return () => {
      listeners.delete(listenerId);
    };
  };

  dispatch({ type: InternalActionTypes.Initial } as A);

  return {
    dispatch: dispatch as Dispatch<A>,
    getState,
    subscribe,
  } as unknown as Store<S & StateExt, A> & Ext;
};

export default createStore;
