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
  setAllChats
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
      <Room />
    );

    return <Container>{content}</Container>;
  }
}

Hub.propTypes = {
  user: PropTypes.object.isRequired,
  currentChats: PropTypes.array.isRequired,
  joinExistingRoom: PropTypes.func.isRequired,
  setAllChats: PropTypes.func.isRequired,
  roomIsActive: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  currentChats: state.messages.currentChats,
  user: state.auth.user,
  roomIsActive: state.views.roomIsActive
});

const mapDispatchToProps = {
  joinExistingRoom: joinExistingRoom,
  setAllChats: setAllChats
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hub);
