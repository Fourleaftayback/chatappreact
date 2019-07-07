import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { ListGroup, ListGroupItem } from "reactstrap";

import ProfileImage from "../common/ProfileImage";

const ChatList = ({ chatList }) => {
  let chats = chatList.map(item => (
    <ListGroupItem
      key={item._id}
      className={classnames("mb-1", {
        "bg-primary text-light": item.isSelected
      })}
      onClick={() => console.log(" ")}>
      <ProfileImage imageUrl={item.profile_image_url} size="2.5rem" />
      {"  "}
      {item.user_name}
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
