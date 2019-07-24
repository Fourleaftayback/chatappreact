import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

import ProfileImage from "../common/ProfileImage";

const MessageList = ({ userId, messageList }) => {
  let content = messageList.map(item =>
    item.user === userId ? (
      <ListGroupItem key={item._id} className="bg-secondary text-right">
        {" "}
        {item.text}
      </ListGroupItem>
    ) : (
      <ListGroupItem key={item._id} className="bg-primary text-light">
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
