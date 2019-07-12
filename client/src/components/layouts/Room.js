import React from "react";
import { connect } from "react-redux";
import { Button, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from "prop-types";
import io from "socket.io-client";
import FormItem from "../../components/form/FormItem";

const Room = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>Group Name or Name</Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          if group list of users here
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>list of previous chats</Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          input and button to send
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Room;
