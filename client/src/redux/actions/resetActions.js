import axios from "axios";
import { MESSAGE, GET_ERRORS } from "./types";

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
