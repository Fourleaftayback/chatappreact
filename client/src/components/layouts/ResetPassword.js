import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Col, Form, Button } from "reactstrap";
import FormItem from "../form/FormItem";
import Message from "../common/Message";

import { resetPassword, checkToken } from "../../redux/actions/resetActions";

const ResetPassword = ({ errors, checkToken, resetPassword, message }) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const indx = window.location.href.lastIndexOf("/");
  const token = window.location.href.substr(indx);

  const onSubmit = e => {
    e.preventDefault();
    const newData = {
      resetPasswordToken: token.replace(/\//g, ""),
      password: password,
      password2: password2
    };
    resetPassword(newData);
  };

  useEffect(() => {
    checkToken(token);
  }, [checkToken, token]);

  let content;
  message.token
    ? (content = <Message message={message.token} />)
    : (content = (
        <React.Fragment>
          <Row className="mt-5">
            <Col xs="9" className="reset-password">
              <h5 className="text-center cus-text-purple mt-3">
                Enter your new password
              </h5>
              <Form className="mt-4">
                <FormItem
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  error={errors.password}
                  onChange={e => setPassword(e.target.value)}
                />
                <FormItem
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  value={password2}
                  error={errors.password2}
                  onChange={e => setPassword2(e.target.value)}
                />
                <Button
                  className="cus-purple-button"
                  block={true}
                  onClick={onSubmit}>
                  Reset Password
                </Button>
              </Form>
            </Col>
          </Row>
        </React.Fragment>
      ));

  return <React.Fragment>{content}</React.Fragment>;
};

ResetPassword.propTypes = {
  errors: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  checkToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  message: state.views.message
});

const mapDispatchToProps = {
  checkToken: checkToken,
  resetPassword: resetPassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
