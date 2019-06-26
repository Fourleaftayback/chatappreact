import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

import {
  NAVBAR_TOGGLE,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  LOGIN_TOGGLE,
  LOGIN_OPEN,
  LOGIN_CLOSE
} from "./actions/types";

const initialState = {};

const viewsToggle = store => next => action => {
  const current = store.getState();
  if (action.type === NAVBAR_TOGGLE) {
    current.views.navBarIsOpen
      ? (action.type = NAVBAR_CLOSE)
      : (action.type = NAVBAR_OPEN);
  }
  if (action.type === LOGIN_TOGGLE) {
    current.views.loginModalIsOpen
      ? (action.type = LOGIN_CLOSE)
      : (action.type = LOGIN_OPEN);
  }
  next(action);
};

const middleware = [thunk, viewsToggle];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
