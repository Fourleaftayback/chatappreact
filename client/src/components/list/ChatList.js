import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

import ProfileImage from "../common/ProfileImage";

const ChatList = ({ chatList }) => {
  let chats = chatList.map(item => (
    <ListGroupItem
      key={item._id}
      classnames="mb-1"
      onClick={() => console.log(" ")}>
      {/*
      <ProfileImage imageUrl={item.profile_image_url} size="2.5rem" />
      */}
      {item.group_chat ? item.chat_name : "Name will go here"}
    </ListGroupItem>
  ));
  return (
    <React.Fragment>
      <ListGroup>{chats}</ListGroup>
    </React.Fragment>
  );
};
ChatList.propTypes = {
  chatList: PropTypes.array.isRequired
};
export default ChatList;
