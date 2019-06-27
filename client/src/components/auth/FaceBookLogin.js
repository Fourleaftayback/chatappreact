import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";

const FaceBookLogin = ({ facebookLogin, buttonText }) => {
  //const [userId, setUserId] = useState("");
  //const [name, setName] = useState("");
  //const [email, setEmail] = useState("");
  //const [profileImageUrl, setProfileImageUrl] = useState("");

  const responseFacebook = response => {
    //setUserId(response.userID);
    //setName(response.name);
    //setEmail(response.email);
    //setProfileImageUrl(response.picture.data.url);
    let user = {
      facebook_id: response.userID,
      user_name: response.name,
      email: response.email,
      profile_image_url: response.picture.data.url
    };
    console.log(user);
    facebookLogin(user);
  };

  return (
    <React.Fragment>
      <FacebookLogin
        appId="323616998587440"
        autoLoad={false}
        fields="name,email,picture"
        onClick={() => console.log("inital")}
        textButton={buttonText}
        callback={responseFacebook}
      />
    </React.Fragment>
  );
};
FaceBookLogin.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default FaceBookLogin;
