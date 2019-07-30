import { HANDLE_LOAD, LOAD_MORE } from "../actions/types";

export const messageMiddleWare = store => next => action => {
  const current = store.getState();
  if (
    action.type === HANDLE_LOAD &&
    current.messages.currentList.length <
      current.messages.activeChatRoom.messages.length
  ) {
    action.type = LOAD_MORE;
    const currentList = current.messages.currentList;
    const wholeList = current.messages.activeChatRoom.messages;
    wholeList.length <= currentList.length + 10
      ? (action.payload = wholeList)
      : (action.payload = wholeList.slice(
          wholeList.length - (currentList.length + 10),
          wholeList.length
        ));
  }
  next(action);
};
