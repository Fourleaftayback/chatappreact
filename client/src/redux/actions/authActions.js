import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../../history/History";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  SHOULD_LAUNCH_MODAL
} from "./types";

import { toggle } from "./viewsActions";

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post("/user/register", userData)
    .then(res => history.push("/"))
    .then(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .then(() => dispatch(toggle("register")))
    .then(() => dispatch(toggle("navbar")))
    .then(() =>
      setTimeout(() => {
        dispatch(toggle("login"));
      }, 400)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const login = userData => dispatch => {
  axios
    .post("/user/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .then(() => dispatch(toggle("login")))
    .then(() => {
      dispatch(toggle("navbar"));
      history.push("/hub");
    })
    .then(() => {
      setTimeout(() => {
        dispatch({
          type: SHOULD_LAUNCH_MODAL
        });
      }, 400);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const facebookLogin = userData => dispatch => {
  axios
    .post("/user/fbauth", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .then(() => dispatch(toggle("login")))
    .then(() => {
      dispatch(toggle("navbar"));
      history.push("/hub");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logOutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch({ type: CLEAR_ERRORS });
  history.push("/");
};
