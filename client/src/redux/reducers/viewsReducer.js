import {
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  LOGIN_OPEN,
  LOGIN_CLOSE
} from "../actions/types";

const initialState = {
  navBarIsOpen: false,
  loginModalIsOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NAVBAR_OPEN:
      return Object.assign({}, state, {
        navBarIsOpen: true
      });
    case NAVBAR_CLOSE:
      return Object.assign({}, state, {
        navBarIsOpen: false
      });
    case LOGIN_OPEN:
      return Object.assign({}, state, {
        loginModalIsOpen: true
      });
    case LOGIN_CLOSE:
      return Object.assign({}, state, {
        loginModalIsOpen: false
      });
    default:
      return state;
  }
}
