import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import io from "socket.io-client";
import FormItem from "../form/FormItem";

import RoomHeader from "./RoomHeader";

const Room = ({ errors }) => {
  const [message, setMessage] = useState("");
  return (
    <React.Fragment>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <RoomHeader isGroup={false} groupName="" name="name of user" />
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          if group list here with count of members and collapsable list
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>list of previous chats</Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <FormItem
            type="text"
            name="message"
            placeholder="message"
            value={message}
            error={errors.message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button
            color="info"
            block={false}
            onClick={() => console.log("sent")}>
            Login
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

Room.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
