import React from "react";
import { NavItem } from "reactstrap";

import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

const AuthLinks = () => {
  return (
    <React.Fragment>
      <NavItem className="auth-item">
        <LoginModal />
      </NavItem>
      <NavItem className="auth-item">
        <RegisterModal />
      </NavItem>
    </React.Fragment>
  );
};

export default AuthLinks;
