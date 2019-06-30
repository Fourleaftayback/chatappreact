import React from "react";
import PropTypes from "prop-types";

const ProfileImage = ({ imageUrl, size, cusClass }) => {
  const ImageSize = {
    height: size,
    width: size
  };

  return (
    <React.Fragment>
      <img
        src={imageUrl}
        className={`rounded-circle ${cusClass}`}
        alt="Profile"
        style={ImageSize}
      />
    </React.Fragment>
  );
};

ProfileImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  cusClass: PropTypes.string
};

export default ProfileImage;
