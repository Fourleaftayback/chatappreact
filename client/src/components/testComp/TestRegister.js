import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Form, Button } from "reactstrap";
import { registerUser } from "../../redux/actions/authActions";
//import history from "../../history/History";

import FormItem from "../form/FormItem";

const TestRegister = ({ errors, registerUser, isAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [user_name, setUser_Name] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  //const [isLoggedIn] = useState(isAuthenticated);

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: email,
      user_name: user_name,
      password: password,
      password2: password2
    };
    registerUser(newUser);
    //console.log(newUser);
  };

  return (
    <React.Fragment>
      <Row className="mt-3">
        <Col md={5} className="m-auto pb-3">
          <h3 className="text-center cus-text-light mt-3">Register</h3>
          <Form className="register-form">
            <FormItem
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              error={errors.email}
              onChange={e => setEmail(e.target.value)}
            />
            <FormItem
              type="text"
              name="user_name"
              placeholder="User Name"
              value={user_name}
              error={errors.user_name}
              onChange={e => setUser_Name(e.target.value)}
            />
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
            <Button color="info" block={true} onClick={onSubmit}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

TestRegister.propTypes = {
  errors: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  isAuthenticated: state.auth.isAuthenticated
});

const MapDispatchToProps = {
  registerUser: registerUser
};

export default connect(
  mapStateToProps,
  MapDispatchToProps
)(withRouter(TestRegister));
