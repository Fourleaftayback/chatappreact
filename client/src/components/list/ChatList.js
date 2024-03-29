import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Badge, Col, Row } from "reactstrap";

import ProfileImage from "../common/ProfileImage";
import { getUserInfo, getUnseenCount } from "../../utils/dataFunctions";
import group from "../../image/group.png";

const ChatList = ({ chatList, userId, onClick }) => {
  let chats = chatList.map(item => {
    let unseenCount = getUnseenCount(userId, item.messages);
    if (item.group_chat) {
      return (
        <ListGroupItem key={item._id} onClick={() => onClick(item, userId)}>
          <Row>
            <Col xs="3">
              <ProfileImage imageUrl={group} size="2.5rem" />
              {unseenCount !== 0 ? (
                <Badge color="danger" className="unseen-count">
                  {unseenCount}
                </Badge>
              ) : null}
            </Col>
            <Col xs="6" className="text-center pt-2">
              <b>{item.chat_name}</b>
            </Col>
            <Col xs="3" />
          </Row>
        </ListGroupItem>
      );
    } else {
      let { user_name, profile_image_url } = getUserInfo(userId, item.userList);
      return (
        <ListGroupItem key={item._id} onClick={() => onClick(item, userId)}>
          <Row>
            <Col xs="3">
              <ProfileImage imageUrl={profile_image_url} size="2.5rem" />
              {unseenCount !== 0 ? (
                <Badge color="danger" className="unseen-count">
                  {unseenCount}
                </Badge>
              ) : null}
            </Col>
            <Col xs="6" className="text-center pt-2">
              <b>{user_name}</b>
            </Col>
            <Col xs="3" />
          </Row>
        </ListGroupItem>
      );
    }
  });
  return (
    <React.Fragment>
      <ListGroup className="chatlist">{chats}</ListGroup>
    </React.Fragment>
  );
};

ChatList.propTypes = {
  chatList: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ChatList;
