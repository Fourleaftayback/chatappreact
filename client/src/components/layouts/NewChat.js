import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import { getAllUsers } from "../../redux/actions/userListAction";

import GroupChatButton from "../buttons/GroupChatButton";
import UserList from "../../components/users/UserList";

class NewChat extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>Search</Col>{" "}
            <Col>
              <GroupChatButton />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 6, order: 2, offset: 3 }}>
              <UserList userList={this.props.userList} />{" "}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
NewChat.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  userList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userList: state.users.userList
});

const mapDispatchToProps = {
  getAllUsers: getAllUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChat);
