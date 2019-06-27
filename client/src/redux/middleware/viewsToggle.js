import {
  NAVBAR_TOGGLE,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  LOGIN_TOGGLE,
  LOGIN_OPEN,
  LOGIN_CLOSE,
  REGISTER_TOGGLE,
  REGISTER_OPEN,
  REGISTER_CLOSE
} from "../actions/types";

export const viewsToggle = store => next => action => {
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
  if (action.type === REGISTER_TOGGLE) {
    current.views.registerModalIsOpen
      ? (action.type = REGISTER_CLOSE)
      : (action.type = REGISTER_OPEN);
  }
  next(action);
};
