import React from "react";
import { connect } from "react-redux";
//import PropTypes from "prop-types";

import { NavItem } from "reactstrap";

import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
const AuthLinks = () => {
  return (
    <React.Fragment>
      <NavItem>
        <LoginModal />
      </NavItem>
      <NavItem>
        <RegisterModal />
      </NavItem>
    </React.Fragment>
  );
};

AuthLinks.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLinks);
