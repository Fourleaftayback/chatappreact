import {
  NAVBAR_TOGGLE,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  LOGIN_TOGGLE,
  LOGIN_OPEN,
  LOGIN_CLOSE,
  REGISTER_TOGGLE,
  REGISTER_OPEN,
  REGISTER_CLOSE,
  PROFILEIMAGE_TOGGLE,
  PROFILEIMAGE_OPEN,
  PROFILEIMAGE_CLOSE,
  GROUPCHATCREATOR_TOGGLE,
  GROUPCHATCREATOR_OPEN,
  GROUPCHATCREATOR_CLOSE,
  SHOULD_LAUNCH_MODAL
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
  if (action.type === PROFILEIMAGE_TOGGLE) {
    current.views.profileImageModalIsOpen
      ? (action.type = PROFILEIMAGE_CLOSE)
      : (action.type = PROFILEIMAGE_OPEN);
  }
  if (action.type === GROUPCHATCREATOR_TOGGLE) {
    current.views.groupChatModalIsOpen
      ? (action.type = GROUPCHATCREATOR_CLOSE)
      : (action.type = GROUPCHATCREATOR_OPEN);
  }
  if (action.type === SHOULD_LAUNCH_MODAL) {
    if (
      current.auth.user.profile_image_url === "" ||
      current.auth.user.profile_image_url === undefined
    )
      action.type = PROFILEIMAGE_OPEN;
  }
  next(action);
};
