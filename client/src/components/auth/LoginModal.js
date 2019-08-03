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
import FaceBookLogin from "./FaceBookLogin";

import { toggle } from "../../redux/actions/viewsActions";
import { login, facebookLogin } from "../../redux/actions/authActions";

const LoginModal = ({
  login,
  errors,
  toggle,
  loginModalIsOpen,
  facebookLogin
}) => {
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
    toggle("login");
  };

  return (
    <React.Fragment>
      <NavLink className="p-0 cus-text-white" onClick={toggleModal}>
        <i className="fas fa-sign-in-alt" />
        Login
      </NavLink>
      <Modal isOpen={loginModalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
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
            <Button className="cus-button-blue" block={true} onClick={onSubmit}>
              Login
            </Button>
          </Form>
          <FaceBookLogin facebookLogin={facebookLogin} buttonText="FaceBook" />
          <NavLink
            className="text-primary text-center mt-2 p
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
  toggle: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  facebookLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  loginModalIsOpen: state.views.loginModalIsOpen
});

const mapDispatchToProps = {
  toggle: toggle,
  login: login,
  facebookLogin: facebookLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
