import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { ListGroup, ListGroupItem } from "reactstrap";

import ProfileImage from "../common/ProfileImage";

const UserList = ({ userList, addChatUser }) => {
  const [isSelected, setSelected] = useState(false);
  const onClick = id => {
    addChatUser(id);
    isSelected ? setSelected(false) : setSelected(true);
  };

  let users = userList.map(item => (
    <ListGroupItem
      key={item._id}
      className={classnames("mb-1", {
        "bg-primary text-light": isSelected
      })}
      onClick={() => onClick(item._id)}>
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
  userList: PropTypes.array.isRequired,
  addChatUser: PropTypes.func.isRequired
};
export default UserList;
