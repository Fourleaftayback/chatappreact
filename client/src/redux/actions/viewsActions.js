import { NAVBAR_TOGGLE, LOGIN_TOGGLE } from "./types";

export const navBarToggle = () => {
  return {
    type: NAVBAR_TOGGLE
  };
};

export const loginToggle = () => {
  return {
    type: LOGIN_TOGGLE
  };
};
