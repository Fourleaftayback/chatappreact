import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Row, Col } from "reactstrap";

import { sendResetRequest } from "../../redux/actions/resetActions";

import FormItem from "../form/FormItem";
import Message from "../common/Message";

const ResetRequest = ({ errors, message, sendResetRequest }) => {
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    const data = {
      email: email
    };
    sendResetRequest(data);
  };

  let content;
  message.success
    ? (content = <Message message={message.success} />)
    : (content = (
        <React.Fragment>
          <h5 className="text-center cus-text-purple mt-3 mb-2">
            Enter your email
          </h5>
          <Form>
            <FormItem
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              error={errors.email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button
              className="cus-purple-button"
              block={true}
              onClick={onSubmit}>
              Login
            </Button>
          </Form>
        </React.Fragment>
      ));
  return (
    <React.Fragment>
      <Row className="mt-5 mx-2">
        <Col className="col-md-6 m-auto p-3 reset-container">{content}</Col>
      </Row>
    </React.Fragment>
  );
};

ResetRequest.propTypes = {
  errors: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  sendResetRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  message: state.views.message
});

const mapDispatchToProps = {
  sendResetRequest: sendResetRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetRequest);
