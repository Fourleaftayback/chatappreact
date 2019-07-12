import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

import ProfileImage from "../common/ProfileImage";
import { getUserInfo, getUnseenCount } from "../../utils/dataFunctions";
import group from "../../image/group.png";

const ChatList = ({ chatList, userId }) => {
  let chats = chatList.map(item => {
    let unseenCount = getUnseenCount(userId, item.messages);
    if (item.group_chat) {
      return (
        <ListGroupItem
          key={item._id}
          classnames="mb-1"
          onClick={() => console.log(" ")}>
          <ProfileImage imageUrl={group} size="2.5rem" />
          {"   "}
          {item.chat_name}
          {"   "}
          {unseenCount}
        </ListGroupItem>
      );
    } else {
      let { user_name, profile_image_url } = getUserInfo(userId, item.userList);
      return (
        <ListGroupItem
          key={item._id}
          classnames="mb-1"
          onClick={() => console.log(" ")}>
          <ProfileImage imageUrl={profile_image_url} size="2.5rem" />
          {"   "}
          {user_name}
          {"   "}
          {unseenCount}
        </ListGroupItem>
      );
    }
  });
  return (
    <React.Fragment>
      <ListGroup>{chats}</ListGroup>
    </React.Fragment>
  );
};

ChatList.propTypes = {
  chatList: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired
};

export default ChatList;

/* 
let count = data.reduce(
  (acc, item) => (item.messageSeenBy.includes("123") ? acc + 1 : acc),
  0
); 
*/
