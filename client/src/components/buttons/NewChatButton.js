import React from "react";
import PropTypes from "prop-types";

const NewChatButton = ({ onClick, iconType }) => {
  return (
    <React.Fragment>
      <i className={iconType} onClick={onClick} />
    </React.Fragment>
  );
};

NewChatButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  iconType: PropTypes.string
};

export default NewChatButton;
