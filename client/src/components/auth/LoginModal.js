import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form
} from "reactstrap";

import FormItem from "../form/FormItem";

import { loginToggle } from "../../redux/actions/viewsActions";
import { login } from "../../redux/actions/authActions";

const LoginModal = ({ login, errors, loginToggle, loginModalIsOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    };

    login(userData);
  };

  const toggleModal = () => {
    loginToggle();
  };

  return (
    <React.Fragment>
      <NavLink className="p-0" onClick={toggleModal}>
        Login
      </NavLink>
      <Modal isOpen={loginModalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}> Login</ModalHeader>
        <ModalBody className="mt-3">
          <Form>
            <FormItem
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              error={errors.email}
              onChange={e => setEmail(e.target.value)}
            />
            <FormItem
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              error={errors.password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button color="info" block={true} onClick={onSubmit}>
              Login
            </Button>
          </Form>
          {/*add Facebook login button here*/}
          <NavLink
            className="text-primary text-center mt-3 p
            -0"
            href={"/forgot"}>
            Forgot Password
          </NavLink>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

LoginModal.propTypes = {
  errors: PropTypes.object.isRequired,
  loginModalIsOpen: PropTypes.bool.isRequired,
  loginToggle: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  loginModalIsOpen: state.views.loginModalIsOpen
});

const mapDispatchToProps = {
  loginToggle: loginToggle,
  login: login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
