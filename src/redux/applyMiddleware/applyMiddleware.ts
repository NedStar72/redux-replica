import type { Dispatch, Enhancer } from '../createStore';
import type { Middleware, MiddlewareAPI } from './types/Middleware';
import compose from './compose';

export interface ApplyMiddleware {
  (): Enhancer;
  <Ext1, S>(middleware1: Middleware<Ext1>): Enhancer<{ dispatch: Ext1 }>;
  <Ext1, Ext2, S>(
    middleware1: Middleware<Ext1>,
    middleware2: Middleware<Ext2>,
  ): Enhancer<{ dispatch: Ext1 & Ext2 }>;
  <Ext1, Ext2, Ext3, S>(
    middleware1: Middleware<Ext1>,
    middleware2: Middleware<Ext2>,
    middleware3: Middleware<Ext3>,
  ): Enhancer<{ dispatch: Ext1 & Ext2 & Ext3 }>;
  <Ext1, Ext2, Ext3, Ext4, S>(
    middleware1: Middleware<Ext1>,
    middleware2: Middleware<Ext2>,
    middleware3: Middleware<Ext3>,
    middleware4: Middleware<Ext4>,
  ): Enhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 }>;
  <Ext1, Ext2, Ext3, Ext4, Ext5, S>(
    middleware1: Middleware<Ext1>,
    middleware2: Middleware<Ext2>,
    middleware3: Middleware<Ext3>,
    middleware4: Middleware<Ext4>,
    middleware5: Middleware<Ext5>,
  ): Enhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 & Ext5 }>;
  (...middlewares: Middleware[]): Enhancer;
}

const applyMiddleware: ApplyMiddleware = (...middlewares: Middleware[]): Enhancer => {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch: Dispatch = () => {
      throw new Error('Dispatching while constructing your middleware is not allowed');
    };

    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
};

export default applyMiddleware;
