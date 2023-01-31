import { createStore, applyMiddleware, compose } from 'redux';
import reducers from 'appRedux/reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //https://github.com/zalmoxisus/redux-devtools-extension

export default function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
}
