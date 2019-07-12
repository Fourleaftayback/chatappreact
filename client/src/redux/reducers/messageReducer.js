import { GET_ALL_CHATS } from "../actions/types";

const initialState = {
  currentChats: [],
  activeChatRoom: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHATS:
      return { ...state, currentChats: [...action.payload] };
    default:
      return state;
  }
}
