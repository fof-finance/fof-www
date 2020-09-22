/**
 * @format
 */
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'src/reducers';

export function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(rootReducer, middlewareEnhancer);
  return store;
}
