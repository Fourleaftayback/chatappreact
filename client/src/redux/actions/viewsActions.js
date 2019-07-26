import {
  SHOULD_LAUNCH_MODAL,
  ROOMISINACTIVE,
  CLEAR_LIST,
  RESET_LENGTH
} from "./types";

export const toggle = name => {
  return {
    type: `${name.toUpperCase()}_TOGGLE`
  };
};

export const shouldLaunchModal = () => {
  return {
    type: SHOULD_LAUNCH_MODAL
  };
};

export const deactivateRoom = () => dispatch => {
  dispatch({ type: ROOMISINACTIVE });
  dispatch({ type: RESET_LENGTH });
  dispatch({ type: CLEAR_LIST, payload: [] });
};
