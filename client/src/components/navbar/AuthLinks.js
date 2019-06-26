import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { NavItem } from "reactstrap";

import LoginModal from "../auth/LoginModal";
const AuthLinks = () => {
  return (
    <React.Fragment>
      <NavItem>
        <LoginModal />
      </NavItem>
      <NavItem>
        Sign Up
        {/*Place sign up modal here*/}
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
