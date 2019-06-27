import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

import { toggle } from "../../redux/actions/viewsActions";

import AuthLinks from "./AuthLinks";
import SignOut from "./SignOut";

const NavBar = ({ navBarIsOpen, toggle, isLoggedIn }) => {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand className="cus-text-light mx-2" href="/">
        <i className="fas fa-comment fa-lg" />
        <span className="ml-2">Chat</span>
      </NavbarBrand>
      <NavbarToggler onClick={() => toggle("navbar")} />

      <Collapse isOpen={navBarIsOpen} navbar>
        <Nav className="navbar-nav mt-2 mt-lg-0 ml-auto">
          {isLoggedIn ? (
            <SignOut onClick={() => console.log("sign out clicked")} />
          ) : (
            <AuthLinks />
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  toggle: PropTypes.func.isRequired,
  navBarIsOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  navBarIsOpen: state.views.navBarIsOpen,
  isLoggedIn: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  toggle: toggle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
