import React from "react";
import PropTypes from "prop-types";

const RoomHeader = ({ isGroup, groupName, name }) => {
  return (
    <React.Fragment>
      {isGroup ? (
        <h3 className="text-center cus-text-purple">{groupName}</h3>
      ) : (
        <h3 className="text-center cus-text-purple">{name}</h3>
      )}
    </React.Fragment>
  );
};

RoomHeader.propTypes = {
  isGroup: PropTypes.bool.isRequired,
  groupName: PropTypes.string,
  name: PropTypes.string
};

export default RoomHeader;
