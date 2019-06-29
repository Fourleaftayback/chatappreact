import React from "react";
import { connect } from "react-redux";
//import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import NewChatButton from "../buttons/NewChatButton";
import ProfileImageModal from "../auth/ProfileImageModal";

const Hub = () => {
  return (
    <Container>
      <Row>
        <Col xs={{ size: 2, order: 2, offset: 9 }}>
          <NewChatButton />
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
