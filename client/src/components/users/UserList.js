import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

import ProfileImage from "../common/ProfileImage";

const UserList = ({ userList }) => {
  let users = userList.map(item => (
    <ListGroupItem key={item._id} className="mb-1">
      <ProfileImage imageUrl={item.profile_image_url} size="2.5rem" />
      {"  "}
      {item.user_name}
    </ListGroupItem>
  ));
  return (
    <React.Fragment>
      <ListGroup>{users}</ListGroup>
    </React.Fragment>
  );
};
UserList.propTypes = {
  userList: PropTypes.array.isRequired
};
export default UserList;
