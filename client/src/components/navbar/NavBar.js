import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

import { toggle } from "../../redux/actions/viewsActions";
import { logOutUser } from "../../redux/actions/authActions";

import AuthLinks from "./AuthLinks";
import SignOut from "../auth/SignOut";

const NavBar = ({ navBarIsOpen, toggle, isLoggedIn, logOutUser }) => {
  return (
    <Navbar dark expand="md">
      <NavbarBrand className="mx-2" href="/">
        <i className="fas fa-comment fa-lg" />
        <span className="ml-2">Chat</span>
      </NavbarBrand>
      <NavbarToggler onClick={() => toggle("navbar")} />

      <Collapse isOpen={navBarIsOpen} navbar>
        <Nav className="navbar-nav mt-2 mt-lg-0 ml-auto">
          {isLoggedIn ? <SignOut onClick={logOutUser} /> : <AuthLinks />}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  navBarIsOpen: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  navBarIsOpen: state.views.navBarIsOpen,
  isLoggedIn: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  toggle: toggle,
  logOutUser: logOutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
