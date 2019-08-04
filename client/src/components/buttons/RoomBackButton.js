import React from "react";
import PropTypes from "prop-types";

const RoomBackButton = ({ onClick }) => {
  return (
    <React.Fragment>
      <i
        className="fas fa-chevron-circle-left fa-2x icon-button"
        onClick={onClick}
      />
    </React.Fragment>
  );
};

RoomBackButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default RoomBackButton;
