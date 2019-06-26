import React from "react";
import PropTypes from "prop-types";
import { Button, NavItem } from "reactstrap";

const SignOut = ({ onClick }) => {
  return (
    <React.Fragment>
      <NavItem>
        <Button
          outline
          size="sm"
          className="cus-text-light cus-btn-transparent nav-btn">
          Sign Out onClick={onClick}
        </Button>
      </NavItem>
    </React.Fragment>
  );
};

SignOut.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SignOut;
