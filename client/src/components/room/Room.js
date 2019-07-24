import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import RoomHeader from "./RoomHeader";
import CollapsableUserList from "../list/CollapsableUserList";
import MessageList from "../list/MessageList";
import FormSend from "../form/FormSend";
import RoomBackButton from "../buttons/RoomBackButton";
import { clearActiveChat } from "../../redux/actions/messageActions";
import { toggle } from "../../redux/actions/viewsActions";

const Room = ({ user, activeChatRoom, socket, clearActiveChat, toggle }) => {
  const [text, setText] = useState("");

  const messageEnd = React.createRef();

  const sendChat = () => {
    let message = {
      roomId: activeChatRoom._id,
      user: user,
      text: text
    };
    socket.emit("sendMessage", message);
    setText("");
  };

  useEffect(() => {
    let data = {
      roomId: activeChatRoom._id,
      _id: user.id
    };
    socket.emit("updateUnseen", data);
  }, [socket, activeChatRoom, user]);

  useEffect(() => {
    const scrollToEnd = () => {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    };
    scrollToEnd();
  }, [messageEnd]);
  useEffect(() => {
    return () => {
      toggle("room");
    };
  }, [toggle]);

  return (
    <React.Fragment>
      <Row>
        <Col sm={{ size: 2, order: 1 }}>
          <RoomBackButton onClick={clearActiveChat} />
        </Col>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <RoomHeader
            isGroup={activeChatRoom.group_chat}
            groupName={activeChatRoom.chat_name}
            name={activeChatRoom.receiver_name}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          {activeChatRoom.group_chat ? (
            <CollapsableUserList
              userList={activeChatRoom.userList}
              socket={socket}
            />
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <MessageList userId={user.id} messageList={activeChatRoom.messages} />
          <div ref={messageEnd} />
        </Col>
      </Row>
      <Row className="fixed-bottom">
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <FormSend
            type="text"
            name="message"
            placeholder="message"
            value={text}
            onChange={e => setText(e.target.value)}
            onClick={sendChat}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

Room.propTypes = {
  user: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  clearActiveChat: PropTypes.func.isRequired,
  roomIsActive: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  clearActiveChat: clearActiveChat,
  toggle: toggle
};

export default connect(
  null,
  mapDispatchToProps
)(Room);
