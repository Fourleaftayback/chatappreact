import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import { getAllUsers } from "../../redux/actions/userListAction";

import FormItem from "../form/FormItem";
import GroupChatButton from "../buttons/GroupChatButton";
import UserList from "../../components/users/UserList";

class NewChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      search: "",
      error: ""
    };
  }
  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userList) {
      this.setState({ userList: nextProps.userList });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.value.length >= 3) {
      let keyword = new RegExp(e.target.value.toLowerCase());
      this.setState({
        userList: this.props.userList.filter(item => {
          return keyword.test(item.user_name.toLowerCase());
        })
      });
    }
    if (e.target.value.length < 3) {
      this.setState({ userList: this.props.userList });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <FormItem
                type="text"
                name="search"
                placeholder="minimum of 3 character"
                value={this.state.search}
                error={this.state.error}
                onChange={this.onChange}
              />
            </Col>{" "}
            <Col>
              <GroupChatButton />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 6, order: 2, offset: 3 }}>
              <UserList userList={this.state.userList} />{" "}
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
