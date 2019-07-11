import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import history from "../../history/History";

import { getAllChats } from "../../redux/actions/messageActions";

import NewChatButton from "../buttons/NewChatButton";
import ProfileImageModal from "../auth/ProfileImageModal";
import ChatList from "../../components/list/ChatList";

const Hub = ({ getAllChats, user, currentChats }) => {
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
          <ChatList chatList={currentChats} userId={user.id} />
        </Col>
      </Row>
      <ProfileImageModal />
    </Container>
  );
};

Hub.propTypes = {
  getAllChats: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  currentChats: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  currentChats: state.messages.currentChats,
  user: state.auth.user
});

const mapDispatchToProps = {
  getAllChats: getAllChats
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hub);
