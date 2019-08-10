import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import io from "socket.io-client";
import axios from "axios";

import ExistingChats from "../allChat/ExistingChats";
import Room from "../room/Room";

import {
  joinExistingRoom,
  setAllChats,
  getAllChats,
  setActiveChat
} from "../../redux/actions/messageActions";

let url;

process.env.NODE_ENV === "production"
  ? (url = "reactchat-app.herokuapp.com")
  : (url = "localhost:5000");

class Hub extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.socket = io(url);
    /*
    this.socket = io("localhost:5000");
    this.socket = io("reactchat-app.herokuapp.com"); */
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
        roomIsActive={this.props.roomIsActive}
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
  getAllChats: PropTypes.func.isRequired,
  setActiveChat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentChats: state.messages.currentChats,
  user: state.auth.user,
  roomIsActive: state.views.roomIsActive
});

const mapDispatchToProps = {
  joinExistingRoom: joinExistingRoom,
  setAllChats: setAllChats,
  getAllChats: getAllChats,
  setActiveChat: setActiveChat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hub);
