import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";

const FaceBookLogin = ({ isAuth }) => {
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
    //set up redux function to confirm with server
    //then provide token
  };

  let fbContent;

  isAuth
    ? (fbContent = null)
    : (fbContent = (
        <FacebookLogin
          appId="323616998587440"
          autoLoad={false}
          fields="name,email,picture"
          //onClick={this.componentClicked}
          callback={responseFacebook}
        />
      ));

  return <React.Fragment>{fbContent}</React.Fragment>;
};

export default FaceBookLogin;
