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
import { handleLoadMore } from "../../redux/actions/messageActions";

const Room = ({
  user,
  activeChatRoom,
  socket,
  clearActiveChat,
  currentList,
  handleLoadMore
}) => {
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
  const loadMore = () => {
    if (document.documentElement.scrollTop === 0) {
      handleLoadMore();
    }
  };

  useEffect(() => {
    const scrollToEnd = () => {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    };
    scrollToEnd();
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, []);

  useEffect(() => {
    return () => {
      clearActiveChat();
    };
  }, [clearActiveChat]);

  return (
    <React.Fragment>
      <div className="message-container">
        <Row>
          <RoomBackButton onClick={clearActiveChat} />

          <Col sm={{ size: 6, order: 2, offset: 3 }} className="mt-2">
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
            <MessageList userId={user.id} messageList={currentList} />
            <div ref={messageEnd} />
          </Col>
        </Row>
      </div>
      <Row className="fixed-bottom mx-1">
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <FormSend
            type="text"
            name="message"
            placeholder=""
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
  currentList: PropTypes.array.isRequired,
  clearActiveChat: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentList: state.messages.currentList,
  activeChatRoom: state.messages.activeChatRoom
});

const mapDispatchToProps = {
  clearActiveChat: clearActiveChat,
  handleLoadMore: handleLoadMore
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
