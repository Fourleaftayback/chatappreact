import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const RoomBackButton = ({ onClick }) => {
  return (
    <React.Fragment>
      <Button outline color="primary" size="sm" onClick={onClick}>
        List of Chats
      </Button>
    </React.Fragment>
  );
};

RoomBackButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default RoomBackButton;
