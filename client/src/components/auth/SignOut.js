import React from "react";
import PropTypes from "prop-types";
import { Button, NavItem } from "reactstrap";

const SignOut = ({ onClick }) => {
  return (
    <React.Fragment>
      <NavItem className="pb-1">
        <Button
          outline
          size="sm"
          onClick={onClick}
          className="sign-out-button cus-text-white nav-btn">
          Sign Out
        </Button>
      </NavItem>
    </React.Fragment>
  );
};

SignOut.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SignOut;
