import React, { useState } from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Collapse, Button } from "reactstrap";

import ProfileImage from "../common/ProfileImage";

const CollapsableUserList = ({ userList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  let users = userList.map(item => (
    <ListGroupItem key={item._id} className="mb-1 bg-primary text-light">
      <ProfileImage imageUrl={item.profile_image_url} size="2.5rem" />
      {"  "}
      {item.user_name}
    </ListGroupItem>
  ));
  return (
    <React.Fragment>
      <div>
        <Button color="primary" outline onClick={toggle}>
          {userList.length} Group Members
        </Button>
        <Button color="primary" outline onClick={() => console.log("")}>
          Add New Member
        </Button>
        <Collapse isOpen={isOpen}>
          <ListGroup>{users}</ListGroup>
        </Collapse>
      </div>
    </React.Fragment>
  );
};
CollapsableUserList.propTypes = {
  userList: PropTypes.array.isRequired
};
export default CollapsableUserList;
