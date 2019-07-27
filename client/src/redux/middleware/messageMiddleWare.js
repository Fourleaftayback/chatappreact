import { HANDLE_LOAD, LOAD_MORE } from "../actions/types";

export const messageMiddleWare = store => next => action => {
  const current = store.getState();
  if (
    action.type === HANDLE_LOAD &&
    current.messages.currentList.length <
      current.messages.activeChatRoom.messages.length
  ) {
    action.type = LOAD_MORE;
    let currentList = current.messages.currentList;
    let wholeList = current.messages.activeChatRoom.messages;
    wholeList.length <= currentList.length + 20
      ? (action.payload = wholeList)
      : (action.payload = wholeList.slice(
          wholeList.length - (currentList.length + 20),
          wholeList.length
        ));
  }
  next(action);
};

/*
action.type = LOAD_MORE;
    let currentList = current.messages.currentList;
    let wholeList = current.messages.activeChatRoom.messages;
    wholeList.length <= currentList.length + 20 ? action.payload = wholeList : action.payload = wholeList.slice(wholeList.length - (currentList.length - 20), wholeList.length)  */
