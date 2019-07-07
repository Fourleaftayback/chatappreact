import { combineReducers } from "redux";
//add reducers here
import authReducer from "./authReducers";
import errorsReducer from "./errorsReducer";
import viewsReducer from "./viewsReducer";
import userListReducer from "./userListReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  views: viewsReducer,
  users: userListReducer,
  messages: messageReducer
});
