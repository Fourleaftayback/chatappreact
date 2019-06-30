import { GET_ALL_USERS } from "../actions/types";

const initialState = {
  userList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return Object.assign({}, state, { userList: [...action.payload] });
    default:
      return state;
  }
}
