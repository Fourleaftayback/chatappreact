import { SHOULD_LAUNCH_MODAL, ROOMISINACTIVE } from "./types";

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

export const deactivateRoom = () => {
  return {
    type: ROOMISINACTIVE
  };
};
