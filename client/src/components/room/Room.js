import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import io from "socket.io-client";
import RoomHeader from "./RoomHeader";
import CollapsableUserList from "../list/CollapsableUserList";
import MessageList from "../list/MessageList";
import FormSend from "../form/FormSend";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      recieverName: "",
      messages: []
    };
    this.socket = io("localhost:5000");
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendChat = () => {
    let message = {
      roomId: this.props.activeChatRoom._id,
      user: this.props.user,
      text: this.state.message
    };
    this.socket.emit("sendChat", message);
    this.setState({ message: "" });
  };

  componentWillMount() {
    this.setState({ messages: this.props.activeChatRoom.messages });
    if (!this.props.activeChatRoom.group_chat) {
      let otherUser = this.props.activeChatRoom.userList.filter(
        item => item._id !== this.props.user.id
      );
      this.setState({ recieverName: otherUser[0].user_name });
    }
  }

  componentDidMount() {
    this.socket.on("connect", () => {
      this.socket.emit("join", [
        this.props.activeChatRoom._id,
        this.props.user
      ]);
    });
    this.socket.on("update", data => {
      this.setState({ messages: data });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            <RoomHeader
              isGroup={this.props.activeChatRoom.group_chat}
              groupName={this.props.activeChatRoom.chat_name}
              name={this.state.recieverName}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            {this.props.activeChatRoom.group_chat ? (
              <CollapsableUserList
                userList={this.props.activeChatRoom.userList}
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
          </Col>
        </Row>
        <Row className="fixed-bottom">
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            <FormSend
              type="text"
              name="message"
              placeholder="message"
              value={this.state.message}
              error={this.props.errors.message}
              onChange={e => this.onChange(e)}
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
