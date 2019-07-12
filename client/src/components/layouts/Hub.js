import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import history from "../../history/History";

import NewChatButton from "../buttons/NewChatButton";
import ProfileImageModal from "../auth/ProfileImageModal";
import ChatList from "../../components/list/ChatList";

const Hub = ({ user, currentChats }) => {
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
  user: PropTypes.object.isRequired,
  currentChats: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  currentChats: state.messages.currentChats,
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hub);
