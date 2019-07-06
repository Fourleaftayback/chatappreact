import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const NewChatButton = ({ color, onClick, iconType }) => {
  return (
    <React.Fragment>
      <Button outline color={color} onClick={onClick}>
        <i className={iconType} />
      </Button>
    </React.Fragment>
  );
};

NewChatButton.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  iconType: PropTypes.string
};

export default NewChatButton;
