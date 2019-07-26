//pass in array list for messages
export const roomReducer = (state, action) => {
  switch (action.type) {
    case "initalload":
      return {
        ...state,
        messages: [
          state.messages.slice(
            state.messages.length - 20,
            state.messages.length
          )
        ]
      };
    case "wholelist":
      return { ...state, messages: [...action.payload] };
    case "loadmore":
      //run finction here to load more
      return;
    default:
      throw new Error();
  }
};
