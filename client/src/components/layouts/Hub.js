import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import history from "../../history/History";
import io from "socket.io-client";
import axios from "axios";
import NewChatButton from "../buttons/NewChatButton";
import ProfileImageModal from "../auth/ProfileImageModal";
import ChatList from "../../components/list/ChatList";

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
  /*
  componentDidUpdate(prevProps) {
    if (this.props.currentChats !== prevProps.currentChats) {
      console.log("running");
      this.socket.on("connect", () => {
        this.props.currentChats.forEach(item => {
          this.socket.emit("join", {
            roomId: item._id,
            userId: this.props.user.id
          });
        });
      });
    }
  } */

  render() {
    return (
      <Container>
        <Row>
          <Col xs={{ size: 2, order: 2, offset: 9 }}>
            <NewChatButton
              color="primary"
              onClick={() => history.push("/createchat")}
              iconType="fab fa-rocketchat fa-2x"
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            <ChatList
              chatList={this.props.currentChats}
              userId={this.props.user.id}
              onClick={this.props.joinExistingRoom}
            />
          </Col>
        </Row>
        <ProfileImageModal />
      </Container>
    );
  }
}

Hub.propTypes = {
  user: PropTypes.object.isRequired,
  currentChats: PropTypes.array.isRequired,
  joinExistingRoom: PropTypes.func.isRequired,
  setAllChats: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentChats: state.messages.currentChats,
  user: state.auth.user
});

const mapDispatchToProps = {
  joinExistingRoom: joinExistingRoom,
  setAllChats: setAllChats
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hub);
