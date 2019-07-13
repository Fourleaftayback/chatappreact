import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import { getAllUsers } from "../../redux/actions/userListAction";
import { toggle } from "../../redux/actions/viewsActions";
import { doesChatExist } from "../../utils/dataFunctions";
import { createNewRoom } from "../../redux/actions/messageActions";

import FormItem from "../form/FormItem";
import UserList from "../../components/list/UserList";
import AlertMessage from "../../components/common/AlertMessage";
import NewChatButton from "../buttons/NewChatButton";

class NewChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      search: "",
      errors: "",
      errorIsOpen: false
    };
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

  selectUser = id => {
    let indx = this.state.userList.findIndex(item => item._id === id);
    let newArr = [...this.state.userList];
    newArr[indx].isSelected = !newArr[indx].isSelected;
    this.setState({ userList: newArr });
  };

  groupChat = () => {
    let users = this.state.userList.filter(item => item.isSelected === true);
    console.log(users);
  };

  chat = () => {
    const selectedCount = this.state.userList.reduce((acc, item) => {
      if (item.isSelected) return acc + 1;
      return acc;
    }, 0);
    if (selectedCount > 1) {
      return this.setState({
        errors: "Please use Group Chat Instead",
        errorIsOpen: true
      });
    }
    let chosenUser = this.state.userList.filter(
      item => item.isSelected === true
    );
    let singleChat = this.props.currentChats.filter(
      item => item.group_chat === false
    );
    let indx = doesChatExist(this.props.user.id, chosenUser[0]._id, singleChat);
    if (indx === -1) {
      let data = {
        recieverId: chosenUser[0]._id
      };
      this.props.createNewRoom(data);
    } else {
      console.log(true);
      console.log(singleChat[indx]);
    }
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userList) {
      nextProps.userList.map(item => (item.isSelected = false));
      this.setState({ userList: nextProps.userList });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row className="mt-2">
            <Col xs="8">
              <FormItem
                type="text"
                name="search"
                placeholder="minimum of 3 character"
                value={this.state.search}
                onChange={this.onChange}
              />
            </Col>
            <Col xs="2">
              <NewChatButton
                color="primary"
                onClick={this.chat}
                iconType="fas fa-user-friends fa-lg"
              />
            </Col>
            <Col xs="2">
              <NewChatButton
                color="primary"
                onClick={this.groupChat}
                iconType="fas fa-users fa-lg"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 6, order: 2, offset: 3 }}>
              <AlertMessage
                color="danger"
                isOpen={this.state.errorIsOpen}
                message={this.state.errors}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 6, order: 2, offset: 3 }}>
              <UserList
                userList={this.state.userList}
                selectUser={this.selectUser}
              />{" "}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

NewChat.propTypes = {
  user: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  userList: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
  currentChats: PropTypes.array.isRequired,
  createNewRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userList: state.users.userList,
  groupChatModalIsOpen: state.views.groupChatModalIsOpen,
  currentChats: state.messages.currentChats,
  user: state.auth.user
});

const mapDispatchToProps = {
  getAllUsers: getAllUsers,
  toggle: toggle,
  createNewRoom: createNewRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChat);
