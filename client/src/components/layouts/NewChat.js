import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import { getAllUsers } from "../../redux/actions/userListAction";

import GroupChatButton from "../buttons/GroupChatButton";

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
          <Row>list of users/search user results</Row>
        </Container>
      </React.Fragment>
    );
  }
}
NewChat.propTypes = {
  getAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  getAllUsers: getAllUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChat);

/* functional version 
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import { getAllUsers } from "../../redux/actions/userListAction";

import GroupChatButton from "../buttons/GroupChatButton";

const NewChat = ({ getAllUsers }) => {
  useEffect(() => {
    console.log("running");
    getAllUsers();
  }, []);
  console.log(getAllUsers);
  return (
    <Container>
      <Row>
        <Col>Search</Col>{" "}
        <Col>
          <GroupChatButton />
        </Col>
      </Row>
      <Row>list of users/search user results</Row>
    </Container>
  );
};

NewChat.propTypes = {
  getAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  getAllUsers: getAllUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChat);
*/
