export const getUserInfo = (id, userList) => {
  let data = userList.filter(item => item._id !== id);
  return data[0];
};

export const getUnseenCount = (id, messages) => {
  return messages.reduce(
    (acc, item) => (item.messageSeenBy.includes(id) ? acc + 1 : acc),
    0
  );
};
