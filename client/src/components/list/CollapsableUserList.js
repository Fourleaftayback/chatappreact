import React, { useState } from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Collapse, Button } from "reactstrap";

import ProfileImage from "../common/ProfileImage";
import AddGroupMember from "../buttons/AddGroupMember";

const CollapsableUserList = ({ userList, socket }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
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
        <AddGroupMember
          modalIsOpen={modalIsOpen}
          toggleModal={toggleModal}
          existingMember={userList}
          socket={socket}
        />
        <Collapse isOpen={isOpen}>
          <ListGroup>{users}</ListGroup>
        </Collapse>
      </div>
    </React.Fragment>
  );
};
CollapsableUserList.propTypes = {
  userList: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired
};
export default CollapsableUserList;
