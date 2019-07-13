import axios from "axios";
import { GET_ALL_CHATS, GET_ERRORS, SET_ACTIVE_CHAT } from "./types";
import history from "../../history/History";

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

export const createNewRoom = receiverId => dispatch => {
  axios
    .post("/messages/newroom", receiverId)
    .then(res => {
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: res.data
      });
      return res.data._id;
    })
    .then(id => {
      history.push(`/room/${id}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const joinExistingRoom = room => dispatch => {
  dispatch({
    type: SET_ACTIVE_CHAT,
    payload: room
  });
  history.push(`/room/${room._id}`);
};
