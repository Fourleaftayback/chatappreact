import React, { useState, Suspense } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Collapse,
  Button
} from "reactstrap";

import ProfileImage from "../common/ProfileImage";

const AddGroupMember = React.lazy(() => import("../buttons/AddGroupMember"));

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
    <ListGroupItem key={item._id} className="mb-1">
      <Row>
        <Col xs="3">
          <ProfileImage imageUrl={item.profile_image_url} size="2.5rem" />
        </Col>
        {"  "}
        <Col xs="6" className="text-center pt-2">
          <b> {item.user_name}</b>
        </Col>
        <Col xs="3" />
      </Row>
    </ListGroupItem>
  ));

  return (
    <React.Fragment>
      <Row className="my-2">
        <Col xs="6" className="text-right">
          <Button className="cus-purple-button" onClick={toggle}>
            {userList.length} Members
          </Button>
        </Col>
        <Col xs="6">
          <Suspense
            fallback={
              <span className="text-center">
                Loading...something went wrong
              </span>
            }>
            <AddGroupMember
              modalIsOpen={modalIsOpen}
              toggleModal={toggleModal}
              existingMember={userList}
              socket={socket}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col>
          <Collapse isOpen={isOpen}>
            <ListGroup>{users}</ListGroup>
          </Collapse>
        </Col>
      </Row>
    </React.Fragment>
  );
};
CollapsableUserList.propTypes = {
  userList: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired
};
export default CollapsableUserList;
