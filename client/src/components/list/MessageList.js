import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";

import ProfileImage from "../common/ProfileImage";

const MessageList = ({ userId, messageList }) => {
  let content = messageList.map(item =>
    item.user === userId ? (
      <ListGroupItem key={item._id} className="message-list">
        <Row>
          <Col xs="10">
            <div className="own-messages px-2">{item.text}</div>
          </Col>
          <Col xs="2" className="pr-1 pt-2 text-right">
            <ProfileImage imageUrl={item.profile_image_url} size="2.2rem" />
          </Col>
        </Row>
      </ListGroupItem>
    ) : (
      <ListGroupItem key={item._id} className="message-list">
        <Row>
          <Col xs="2" className="pl-1 pt-2">
            <ProfileImage imageUrl={item.profile_image_url} size="2.2rem" />
          </Col>
          <Col xs="10">
            <div className="other-messages px-2">{item.text}</div>
          </Col>
        </Row>
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
