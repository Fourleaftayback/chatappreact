import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

import ProfileImage from "../common/ProfileImage";

const userStyle = {
  backGroundColor: "rgba(249, 249, 249)",
  color: "black"
};

const receiverStyle = {
  backgroundImage:
    "linear-gradient(to bottom right, rgba(96, 63, 134), rgba(72, 38, 99))",
  color: "rgba(255, 255, 252)"
};

const MessageList = ({ userId, messageList }) => {
  let content = messageList.map(item =>
    item.user === userId ? (
      <ListGroupItem key={item._id} className="text-right" style={userStyle}>
        {" "}
        {item.text}
      </ListGroupItem>
    ) : (
      <ListGroupItem key={item._id} style={receiverStyle}>
        {" "}
        <ProfileImage imageUrl={item.profile_image_url} size="2.5rem" />
        {item.text}
      </ListGroupItem>
    )
  );
  return (
    <React.Fragment>
      <ListGroup>{content}</ListGroup>
    </React.Fragment>
  );
};

MessageList.propTypes = {
  userId: PropTypes.string.isRequired,
  messageList: PropTypes.array.isRequired
};

export default MessageList;
