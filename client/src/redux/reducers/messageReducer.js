import { GET_ALL_CHATS, SET_ACTIVE_CHAT } from "../actions/types";

const initialState = {
  currentChats: [],
  activeChatRoom: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHATS:
      return { ...state, currentChats: [...action.payload] };
    case SET_ACTIVE_CHAT:
      return { ...state, activeChatRoom: action.payload };
    default:
      return state;
  }
}
