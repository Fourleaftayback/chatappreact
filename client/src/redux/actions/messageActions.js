import axios from "axios";
import { GET_ALL_CHATS, GET_ERRORS, SET_ACTIVE_CHAT } from "./types";
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

export const createGroup = data => dispatch => {
  axios
    .post("/messages/newgroup", data)
    .then(res => {
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: res.data
      });
      dispatch(toggle("groupchatcreator"));
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

export const joinExistingRoom = (room, id) => dispatch => {
  if (!room.group_chat) {
    let otherUser = room.userList.filter(item => item._id !== id);
    room.receiver_name = otherUser[0].user_name;
  }
  dispatch({
    type: SET_ACTIVE_CHAT,
    payload: room
  });
  dispatch(toggle("room"));
};

export const setActiveChat = data => dispatch => {
  dispatch({
    type: SET_ACTIVE_CHAT,
    payload: data
  });
};
