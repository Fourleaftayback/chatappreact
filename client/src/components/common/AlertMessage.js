import React from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

const AlertMessage = ({ color, message, isOpen }) => {
  return (
    <React.Fragment>
      <Alert color={color} isOpen={isOpen} className="text-center">
        {message}
      </Alert>
    </React.Fragment>
  );
};
AlertMessage.propTypes = {
  color: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired
};
export default AlertMessage;
