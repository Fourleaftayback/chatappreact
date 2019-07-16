import React from "react";
import PropTypes from "prop-types";

const RoomHeader = ({ isGroup, groupName, name }) => {
  return (
    <React.Fragment>
      {isGroup ? (
        <h3 className="text-center">{groupName}</h3>
      ) : (
        <h3 className="text-center">{name}</h3>
      )}
    </React.Fragment>
  );
};

RoomHeader.propTypes = {
  isGroup: PropTypes.bool,
  groupName: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default RoomHeader;
