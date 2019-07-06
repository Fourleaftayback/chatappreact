import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from "prop-types";
import io from "socket.io-client";
import FormItem from "../../components/form/FormItem";

class TestSocket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      userList: [],
      messages: [],
      room: "someRoom"
    };
    this.socket = io("localhost:5000", {
      query: `roomId=${this.state.room}`
    });
  }

  componentDidMount() {
    this.socket.on("updatechat", data => {
      this.setState({ messages: data });
    });
    this.socket.on("updateusers", data => {
      this.setState({ userList: data });
    });
    this.socket.on("connect", () => {
      this.socket.emit("adduser", [this.state.room, this.props.user]);
    });
  }

  sendMessage = () => {
    let message = {
      userInfo: this.props.user,
      message: this.state.message,
      roomId: this.state.room
    };
    this.socket.emit("sendchat", message);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            <ListGroup>
              {this.state.userList.map((item, i) => (
                <ListGroupItem key={i}>name: {item.user_name}</ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            <ListGroup>
              {this.state.messages.map((item, i) => (
                <ListGroupItem key={i}>
                  name: {item.userInfo.user_name}
                  {"   "} {item.message}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <FormItem
          type="text"
          name="message"
          value={this.state.message}
          onChange={this.onChange}
        />
        <Button onClick={this.sendMessage}>Send</Button>
        {/*run list of users here and each message*/}
      </React.Fragment>
    );
  }
}

TestSocket.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestSocket);
