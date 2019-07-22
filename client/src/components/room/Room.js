import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import history from "../../history/History";

import RoomHeader from "./RoomHeader";
import CollapsableUserList from "../list/CollapsableUserList";
import MessageList from "../list/MessageList";
import FormSend from "../form/FormSend";

const Room = ({ user, activeChatRoom, socket }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(null);

  const messageEnd = React.createRef();

  const sendChat = () => {
    let message = {
      roomId: activeChatRoom._id,
      userId: user.id,
      text: text
    };
    socket.emit("sendChat", message);
    setText({ text: "" });
  };

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
          <MessageList userId={user.id} messageList={[]} />
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
  activeChatRoom: PropTypes.object.isRequired
};

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(Room);
