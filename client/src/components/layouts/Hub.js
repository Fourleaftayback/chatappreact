import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import history from "../../history/History";

import NewChatButton from "../buttons/NewChatButton";
import ProfileImageModal from "../auth/ProfileImageModal";
import ChatList from "../../components/list/ChatList";

import {
  joinExistingRoom,
  getAllChats
} from "../../redux/actions/messageActions";

const Hub = ({ user, currentChats, joinExistingRoom, getAllChats }) => {
  useEffect(() => {
    getAllChats();
  }, [getAllChats]);

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
            chatList={currentChats}
            userId={user.id}
            onClick={joinExistingRoom}
          />
        </Col>
      </Row>
      <ProfileImageModal />
    </Container>
  );
};

Hub.propTypes = {
  user: PropTypes.object.isRequired,
  currentChats: PropTypes.array.isRequired,
  joinExistingRoom: PropTypes.func.isRequired,
  getAllChats: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentChats: state.messages.currentChats,
  user: state.auth.user
});

const mapDispatchToProps = {
  joinExistingRoom: joinExistingRoom,
  getAllChats: getAllChats
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hub);
