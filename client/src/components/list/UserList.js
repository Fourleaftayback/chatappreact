import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";

import ProfileImage from "../common/ProfileImage";

const UserList = ({ userList, selectUser }) => {
  const onClick = id => {
    selectUser(id);
  };
  let users = userList.map(item => (
    <ListGroupItem
      key={item._id}
      className={classnames("mb-1 user-list-modal", {
        "user-selected": item.isSelected
      })}
      onClick={() => onClick(item._id)}>
      <Row>
        <Col xs="3">
          <ProfileImage imageUrl={item.profile_image_url} size="2.5rem" />
        </Col>
        <Col xs="6" className="pt-2 text-center">
          <b>{item.user_name}</b>
        </Col>
        <Col xs="3" />
      </Row>
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
  selectUser: PropTypes.func.isRequired
};
export default UserList;
