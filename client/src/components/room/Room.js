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
import { deactivateRoom } from "../../redux/actions/viewsActions";

const Room = ({
  user,
  activeChatRoom,
  socket,
  clearActiveChat,
  deactivateRoom
}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

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
    activeChatRoom.messages.length >= 20
      ? setMessages(
          activeChatRoom.messages.slice(
            activeChatRoom.messages.length - 20,
            activeChatRoom.messages.length
          )
        )
      : setMessages(activeChatRoom.messages);
  }, [activeChatRoom]);

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
      deactivateRoom();
    };
  }, [deactivateRoom]);

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
          <MessageList userId={user.id} messageList={messages} />
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
  deactivateRoom: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  clearActiveChat: clearActiveChat,
  deactivateRoom: deactivateRoom
};

export default connect(
  null,
  mapDispatchToProps
)(Room);

/*
  const loadMore = () => {
    if (document.documentElement.scrollTop === 0) {
      if (activeChatRoom.messages.length >= maxMessages + 20) {
        console.log(true);
        let newCount = maxMessages + 20;
        setMaxMessages(newCount);
        console.log(newCount);
        console.log(maxMessages);
        let moreMessages = activeChatRoom.messages.slice(
          activeChatRoom.messages.length - maxMessages,
          activeChatRoom.messages.length
        );
        setMessages(moreMessages);
      } else {
        setMessages(activeChatRoom.messages);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, []);
  */
/*
class Room extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", messages: [], messageCount: 20 };

    this.messageEnd = React.createRef();
  }
  sendChat = () => {
    let message = {
      roomId: this.props.activeChatRoom._id,
      user: this.props.user,
      text: this.state.text
    };
    this.props.socket.emit("sendMessage", message);
    this.setState({ text: "" });
  };

  scrollToEnd = () => {
    this.messageEnd.current.scrollIntoView({
      behavior: "auto"
    });
  };
  componentDidMount() {
    this.props.activeChatRoom.messages.length >= 20
      ? this.setState({
          messages: this.props.activeChatRoom.messages.slice(
            this.props.activeChatRoom.messages.length - 20,
            this.props.activeChatRoom.messages.length
          )
        })
      : this.setState({ messages: this.props.activeChatRoom.messages });

    let data = {
      roomId: this.props.activeChatRoom._id,
      _id: this.props.user.id
    };
    //this.props.socket.emit("updateUnseen", data);
    this.scrollToEnd();
  }

  componentWillUnmount() {
    this.props.deactivateRoom();
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={{ size: 2, order: 1 }}>
            <RoomBackButton onClick={clearActiveChat} />
          </Col>
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            <RoomHeader
              isGroup={this.props.activeChatRoom.group_chat}
              groupName={this.props.activeChatRoom.chat_name}
              name={this.props.activeChatRoom.receiver_name}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            {this.props.activeChatRoom.group_chat ? (
              <CollapsableUserList
                userList={this.props.activeChatRoom.userList}
                socket={this.props.socket}
              />
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            <MessageList
              userId={this.props.user.id}
              messageList={this.state.messages}
            />
            <div ref={this.messageEnd} />
          </Col>
        </Row>
        <Row className="fixed-bottom">
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            <FormSend
              type="text"
              name="message"
              placeholder="message"
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
              onClick={this.sendChat}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

Room.propTypes = {
  user: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  clearActiveChat: PropTypes.func.isRequired,
  roomIsActive: PropTypes.bool.isRequired,
  deactivateRoom: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  clearActiveChat: clearActiveChat,
  deactivateRoom: deactivateRoom
};

export default connect(
  null,
  mapDispatchToProps
)(Room);
*/
