import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
//import history from "../../history/History";

import ExistingChats from "../allChat/ExistingChats";
import Room from "../room/Room";

import {
  joinExistingRoom,
  setAllChats,
  clearActiveChat,
  getAllChats,
  setActiveChat
} from "../../redux/actions/messageActions";

class Hub extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.socket = io("localhost:5000");
  }
  componentDidMount() {
    axios.get("/messages/all").then(res => {
      const roomData = {
        userId: this.props.user.id,
        roomIds: res.data.map(item => item._id)
      };
      this.socket.emit("join", roomData);
      this.props.setAllChats(res.data);
    });
    this.socket.on("updateAllRooms", data => {
      this.props.setAllChats(data);
    });
    this.socket.on("updateRoom", payload => {
      this.props.roomIsActive
        ? this.props.setActiveChat(payload)
        : this.props.getAllChats();
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    let content = !this.props.roomIsActive ? (
      <ExistingChats
        user={this.props.user}
        currentChats={this.props.currentChats}
        joinExistingRoom={this.props.joinExistingRoom}
      />
    ) : (
      <Room
        socket={this.socket}
        user={this.props.user}
        activeChatRoom={this.props.activeChatRoom}
        clearActiveChat={this.props.clearActiveChat}
        roomIsActive={this.props.roomIsActive}
        getAllChats={this.props.getAllChats}
      />
    );

    return <Container>{content}</Container>;
  }
}

Hub.propTypes = {
  user: PropTypes.object.isRequired,
  currentChats: PropTypes.array.isRequired,
  joinExistingRoom: PropTypes.func.isRequired,
  setAllChats: PropTypes.func.isRequired,
  roomIsActive: PropTypes.bool.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  clearActiveChat: PropTypes.func.isRequired,
  getAllChats: PropTypes.func.isRequired,
  setActiveChat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentChats: state.messages.currentChats,
  user: state.auth.user,
  roomIsActive: state.views.roomIsActive,
  activeChatRoom: state.messages.activeChatRoom
});

const mapDispatchToProps = {
  joinExistingRoom: joinExistingRoom,
  setAllChats: setAllChats,
  clearActiveChat: clearActiveChat,
  getAllChats: getAllChats,
  setActiveChat: setActiveChat
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Hub)
);
