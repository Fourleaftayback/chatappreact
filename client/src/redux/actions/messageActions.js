import axios from "axios";
import { GET_ALL_CHATS, GET_ERRORS } from "./types";

export const getAllChats = () => dispatch => {
  axios
    .get("/messages/all")
    .then(res => {
      dispatch({
        type: GET_ALL_CHATS,
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

export const createNewRoom = (user, receiver) => {};

export const joinExistingRoom = (roomId, user) => {};
