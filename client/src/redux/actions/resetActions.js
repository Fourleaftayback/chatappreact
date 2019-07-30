import axios from "axios";
import { MESSAGE, GET_ERRORS } from "./types";
import history from "../../history/History";
import { toggle } from "../actions/viewsActions";

export const sendResetRequest = email => dispatch => {
  axios
    .post("/reset/forgot", email)
    .then(res =>
      dispatch({
        type: MESSAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const checkToken = token => dispatch => {
  axios
    .get(`/reset/${token}`)
    .then()
    .catch(err => {
      dispatch({
        type: MESSAGE,
        payload: err.response.data
      });
    });
};

export const resetPassword = (url, data) => dispatch => {
  axios
    .post("/reset/newpassword", data)
    .then(res => {
      history.push("/");
    })
    .then(() => {
      setTimeout(() => {
        dispatch(toggle("login"));
      }, 400);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
