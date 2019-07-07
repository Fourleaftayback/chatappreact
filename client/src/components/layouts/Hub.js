import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import NewChatButton from "../buttons/NewChatButton";
import ProfileImageModal from "../auth/ProfileImageModal";
import history from "../../history/History";

import { getAllChats } from "../../redux/actions/messageActions";

const Hub = ({ getAllChats }) => {
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
          list of active chats here
        </Col>
      </Row>
      <ProfileImageModal />
    </Container>
  );
};

Hub.propTypes = {
  getAllChats: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentChats: state.messages.currentChats
});

const mapDispatchToProps = {
  getAllChats: getAllChats
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hub);
