import React from "react";

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

const NavBar = () => {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand className="cus-text-light mx-2" href="/">
        <i className="fas fa-comment fa-lg" />
        <span className="ml-2">Chat</span>
      </NavbarBrand>
      <NavbarToggler onClick={() => console.log("toggler clicked")} />

      <Collapse isOpen={false} navbar>
        <Nav className="navbar-nav mr-auto mt-lg-0" />
        <Nav className="navbar-nav mt-2 mt-lg-0" />
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
