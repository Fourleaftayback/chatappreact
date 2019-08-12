import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

import { viewsToggle } from "./middleware/viewsToggle";

import { messageMiddleWare } from "./middleware/messageMiddleWare";

const initialState = {};

const middleware = [thunk, viewsToggle, messageMiddleWare];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      ...middleware
    ) /*,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
  )
);

export default store;
