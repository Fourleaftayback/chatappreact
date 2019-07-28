import React from "react";
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

export default AuthLinks;
