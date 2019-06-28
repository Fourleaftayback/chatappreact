import axios from "axios";

import { GET_ALL_USERS } from "./types";

export const getAllUsers = () => dispatch => {
  axios
    .get("http://localhost:5000/list/allusers")
    .then(res => {
      console.log("running");
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
