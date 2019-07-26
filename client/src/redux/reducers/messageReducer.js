import {
  GET_ALL_CHATS,
  SET_ACTIVE_CHAT,
  SET_INITIAL_LIST,
  CLEAR_LIST,
  RESET_LENGTH
} from "../actions/types";

const initialState = {
  currentChats: [],
  activeChatRoom: {},
  currentList: [],
  listLength: 20
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHATS:
      return { ...state, currentChats: [...action.payload] };
    case SET_ACTIVE_CHAT:
      return { ...state, activeChatRoom: action.payload };
    case SET_INITIAL_LIST:
      return { ...state, currentList: [...action.payload] };
    case CLEAR_LIST:
      return { ...state, currentList: [...action.payload] };
    case RESET_LENGTH:
      return { ...state, listLength: 20 };
    default:
      return state;
  }
}
