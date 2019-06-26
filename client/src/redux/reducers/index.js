import { combineReducers } from "redux";
//add reducers here
import authReducer from "./authReducers";
import errorsReducer from "./errorsReducer";
import viewsReducer from "./viewsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  views: viewsReducer
});
