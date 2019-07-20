import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import io from "socket.io-client";
import history from "../../history/History";

import RoomHeader from "./RoomHeader";
import CollapsableUserList from "../list/CollapsableUserList";
import MessageList from "../list/MessageList";
import FormSend from "../form/FormSend";

const Room = ({ user, errors, activeChatRoom }) => {
  const [text, setText] = useState("");
  const [recieverName, setRecieverName] = useState("");
  const [messages, setMessages] = useState(null);

  const socket = io("localhost:5000");

  const messageEnd = React.createRef();
  const onChange = e => {
    setText(e.target.value);
  };

  const sendChat = () => {
    let message = {
      roomId: activeChatRoom._id,
      user: user,
      text: text
    };
    socket.emit("sendChat", message);
    setText({ text: "" });
  };

  useEffect(() => {
    if (Object.keys(activeChatRoom).length === 0) return history.push("/hub");
    setMessages(activeChatRoom.messages);
  }, [activeChatRoom]);

  useEffect(() => {
    if (activeChatRoom.group_chat) {
      let otherUser = activeChatRoom.userList.filter(
        item => item._id !== user.id
      );
      setRecieverName(otherUser[0].user_name);
    }
  }, [activeChatRoom, user]);

  useEffect(() => {
    const scrollToEnd = () => {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    };
    scrollToEnd();
  }, [messageEnd, messages]);
  /*
  useEffect(() => {
    return () => {
      let data = {
        roomId: activeChatRoom._id,
        _id: user.id
      };
      socket.emit("updateUnseen", data);
      socket.close();
    }
  }, [])
  */
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
            <CollapsableUserList
              userList={activeChatRoom.userList}
              socket={socket}
            />
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <MessageList userId={user.id} messageList={this.state.messages} />
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
            error={errors.message}
            onChange={onChange}
            onClick={sendChat}
          />
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
