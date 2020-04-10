import { todoApp } from './reducers'
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const store = createStore(
  todoApp,
  applyMiddleware(thunk)
);
