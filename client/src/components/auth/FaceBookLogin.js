import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";

const FaceBookLogin = ({ facebookLogin, buttonText }) => {
  const responseFacebook = response => {
    let user = {
      facebook_id: response.userID,
      user_name: response.name,
      email: response.email,
      profile_image_url: response.picture.data.url
    };
    facebookLogin(user);
  };

  return (
    <React.Fragment>
      <FacebookLogin
        appId="323616998587440"
        autoLoad={false}
        fields="name,email,picture"
        textButton={buttonText}
        callback={responseFacebook}
        cssClass="cus-fb-button"
      />
    </React.Fragment>
  );
};
FaceBookLogin.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default FaceBookLogin;
