import React from "react";
import PropTypes from "prop-types";

const NewChatButton = ({
  onClick,
  iconType,
  tooltipContainer,
  tooltipClass,
  toolTipText
}) => {
  return (
    <React.Fragment>
      <div className={tooltipContainer}>
        <i className={iconType} onClick={onClick} />
        <span className={tooltipClass}>{toolTipText}</span>
      </div>
    </React.Fragment>
  );
};

NewChatButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  iconType: PropTypes.string,
  tooltipContainer: PropTypes.string,
  tooltipClass: PropTypes.string,
  toolTipText: PropTypes.string
};

export default NewChatButton;
