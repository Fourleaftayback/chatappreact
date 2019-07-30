import {
  GET_ALL_CHATS,
  SET_ACTIVE_CHAT,
  SET_LIST,
  CLEAR_LIST,
  LOAD_MORE
} from "../actions/types";

const initialState = {
  currentChats: [],
  activeChatRoom: {},
  currentList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHATS:
      return { ...state, currentChats: [...action.payload] };
    case SET_ACTIVE_CHAT:
      return { ...state, activeChatRoom: action.payload };
    case SET_LIST:
      return { ...state, currentList: [...action.payload] };
    case CLEAR_LIST:
      return { ...state, currentList: [...action.payload] };
    case LOAD_MORE:
      return { ...state, currentList: [...action.payload] };
    default:
      return state;
  }
}
