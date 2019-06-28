import axios from "axios";

import { GET_ALL_USERS, GET_ERRORS } from "./types";

export const getAllUsers = () => dispatch => {
  axios
    .get("/list/allusers")
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
