import {
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  LOGIN_OPEN,
  LOGIN_CLOSE,
  REGISTER_OPEN,
  REGISTER_CLOSE,
  PROFILEIMAGE_OPEN,
  PROFILEIMAGE_CLOSE,
  GROUPCHATCREATOR_OPEN,
  GROUPCHATCREATOR_CLOSE
} from "../actions/types";

const initialState = {
  navBarIsOpen: false,
  loginModalIsOpen: false,
  registerModalIsOpen: false,
  profileImageModalIsOpen: false,
  groupChatModalIsOpen: false
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
    case REGISTER_OPEN:
      return Object.assign({}, state, {
        registerModalIsOpen: true
      });
    case REGISTER_CLOSE:
      return Object.assign({}, state, {
        registerModalIsOpen: false
      });
    case PROFILEIMAGE_OPEN:
      return Object.assign({}, state, {
        profileImageModalIsOpen: true
      });
    case PROFILEIMAGE_CLOSE:
      return Object.assign({}, state, {
        profileImageModalIsOpen: false
      });
    case GROUPCHATCREATOR_OPEN:
      return Object.assign({}, state, {
        groupChatModalIsOpen: true
      });
    case GROUPCHATCREATOR_CLOSE:
      return Object.assign({}, state, {
        groupChatModalIsOpen: false
      });
    default:
      return state;
  }
}
