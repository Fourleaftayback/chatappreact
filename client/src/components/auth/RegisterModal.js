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

import { facebookLogin, registerUser } from "../../redux/actions/authActions";
import { toggle } from "../../redux/actions/viewsActions";

const RegisterModal = ({
  errors,
  facebookLogin,
  registerModalIsOpen,
  toggle,
  registerUser
}) => {
  const [email, setEmail] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: email,
      user_name: user_name,
      password: password,
      password2: password2
    };
    registerUser(userData);
  };

  const toggleModal = () => {
    toggle("register");
  };

  return (
    <React.Fragment>
      <NavLink className="p-0" onClick={toggleModal}>
        Register
      </NavLink>
      <Modal isOpen={registerModalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Register</ModalHeader>
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
              type="text"
              name="user_name"
              placeholder="User Name"
              value={user_name}
              error={errors.user_name}
              onChange={e => setUserName(e.target.value)}
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
              placeholder="Password"
              value={password2}
              error={errors.password2}
              onChange={e => setPassword2(e.target.value)}
            />
            <Button color="info" block={true} onClick={onSubmit}>
              Register
            </Button>
          </Form>
          <br />
          <FaceBookLogin
            facebookLogin={facebookLogin}
            buttonText="FaceBook Register"
          />
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

RegisterModal.propTypes = {
  errors: PropTypes.object.isRequired,
  facebookLogin: PropTypes.func.isRequired,
  registerModalIsOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  registerModalIsOpen: state.views.registerModalIsOpen
});

const mapDispatchToProps = {
  facebookLogin: facebookLogin,
  toggle: toggle,
  registerUser: registerUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterModal);
