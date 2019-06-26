import axios from "axios";
//import setAuthToken from "../../utils/setAuthToken";
//import jwt_decode from "jwt-decode";
import history from "../../history/History";

import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from "./types";

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
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const login = userData => dispatch => {
  console.log(userData);
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
