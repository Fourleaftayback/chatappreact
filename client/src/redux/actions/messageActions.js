import axios from "axios";
import {
  GET_ALL_CHATS,
  GET_ERRORS,
  SET_ACTIVE_CHAT,
  ROOMISINACTIVE,
  SET_LIST,
  CLEAR_LIST,
  HANDLE_LOAD
} from "./types";
import history from "../../history/History";
import { toggle } from "./viewsActions";

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

export const setAllChats = data => dispatch => {
  dispatch({
    type: GET_ALL_CHATS,
    payload: data
  });
};

export const createNewRoom = receiverId => dispatch => {
  axios
    .post("/messages/newroom", receiverId)
    .then(res => {
      let otherUser = res.data.userList.filter(item => item._id !== receiverId);
      res.data.receiver_name = otherUser[1].user_name;
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: res.data
      });
    })
    .then(() => history.push("/hub"))
    .then(dispatch(toggle("room")))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createGroup = data => dispatch => {
  axios
    .post("/messages/newgroup", data)
    .then(res => {
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: res.data
      });
    })
    .then(() => toggle("groupchatcreator"))
    .then(() => history.push("/hub"))
    .then(() => dispatch(toggle("room")))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const joinExistingRoom = (room, id) => dispatch => {
  if (!room.group_chat) {
    let otherUser = room.userList.filter(item => item._id !== id);
    room.receiver_name = otherUser[0].user_name;
  }
  dispatch({
    type: SET_ACTIVE_CHAT,
    payload: room
  });
  let messages;
  room.messages.length > 20
    ? (messages = room.messages.slice(
        room.messages.length - 20,
        room.messages.length
      ))
    : (messages = room.messages);
  dispatch({
    type: SET_LIST,
    payload: messages
  });
  history.push("/hub");
  dispatch(toggle("room"));
};

export const setActiveChat = data => dispatch => {
  dispatch({
    type: SET_ACTIVE_CHAT,
    payload: data
  });
  let messages;
  data.messages.length > 20
    ? (messages = data.messages.slice(
        data.messages.length - 20,
        data.messages.length
      ))
    : (messages = data.messages);
  dispatch({
    type: SET_LIST,
    payload: messages
  });
};

export const clearActiveChat = () => dispatch => {
  dispatch(getAllChats());
  dispatch({
    type: ROOMISINACTIVE
  });
  dispatch({
    type: SET_ACTIVE_CHAT,
    payload: {}
  });
  dispatch({
    type: CLEAR_LIST,
    payload: []
  });
};

export const handleLoadMore = () => {
  return {
    type: HANDLE_LOAD
  };
};
