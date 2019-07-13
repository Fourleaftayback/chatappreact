import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import io from "socket.io-client";
import FormItem from "../form/FormItem";

import RoomHeader from "./RoomHeader";
import CollapsableUserList from "../list/CollapsableUserList";

const Room = ({ user, errors, activeChatRoom }) => {
  const [message, setMessage] = useState("");
  const [recieverName, setRecieverName] = useState("");
  useEffect(() => {
    if (!activeChatRoom.group_chat) {
      let otherUser = activeChatRoom.userList.filter(
        item => item._id !== user.id
      );
      setRecieverName(otherUser[0].user_name);
    }
  }, [activeChatRoom.userList, user.id, activeChatRoom.group_chat]);
  return (
    <React.Fragment>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <RoomHeader
            isGroup={activeChatRoom.group_chat}
            groupName={activeChatRoom.chat_name}
            name={recieverName}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          {activeChatRoom.group_chat ? (
            <CollapsableUserList userList={activeChatRoom.userList} />
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>list of previous chats</Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <FormItem
            type="text"
            name="message"
            placeholder="message"
            value={message}
            error={errors.message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button
            color="info"
            block={false}
            onClick={() => console.log("sent")}>
            Send
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

Room.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  activeChatRoom: state.messages.activeChatRoom,
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
