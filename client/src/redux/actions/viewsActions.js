import { SHOULD_LAUNCH_MODAL } from "./types";

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
