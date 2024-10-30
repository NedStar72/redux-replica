import { createStore } from './redux';

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

const store = createStore(reducer);

console.log(store.getState());

store.dispatch({ type: 'increment' });

console.log(store.getState());
