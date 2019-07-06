import React from "react";
import { connect } from "react-redux";
//import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import NewChatButton from "../buttons/NewChatButton";
import ProfileImageModal from "../auth/ProfileImageModal";
import history from "../../history/History";

const Hub = () => {
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
      <Row>list of active chats here</Row>
      <ProfileImageModal />
    </Container>
  );
};

Hub.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hub);
