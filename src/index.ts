import { createStore, applyMiddleware, type Middleware, type Dispatch } from './redux';

const initialState = {
  counter: 0,
};

type Increment = {
  type: 'increment';
};

const reducer = (state = initialState, action: Increment) => {
  switch (action.type) {
    case 'increment':
      return {
        counter: state.counter + 1,
      };
    default:
      return state;
  }
};

const logger: Middleware<{}, Dispatch, typeof initialState> = ({ getState }) => {
  return next => action => {
    console.log('Will dispatch:', action);

    const returnValue = next(action);

    console.log('State after dispatch:', getState());

    return returnValue;
  };
};

const store = createStore(reducer, applyMiddleware(logger));

console.log('Initial state:', store.getState());

store.dispatch({ type: 'increment' });
store.dispatch({ type: 'increment' });
store.dispatch({ type: 'increment' });

