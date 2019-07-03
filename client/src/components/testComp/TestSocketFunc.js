import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from "prop-types";
import io from "socket.io-client";
import FormItem from "../../components/form/FormItem";
//
const TestSocketFunc = ({ user }) => {
  const [message, setMessage] = useState("");
  const [userList, setUserList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const socket = io("localhost:5000");
  socket.on("updatechat", (where, data) => {
    console.log(`this message is from: ${where}`);
    console.log(data);
    // setChatList(data);
  });

  // listener, whenever the server emits 'updateusers', this updates the username list
  socket.on("updateusers", function(data) {
    console.log("from: updateusers");
    console.log(data);
    //setUserList(data);
  });

  const sendMessage = () => {
    //socket.emit("sendchat", message);
  };
  useEffect(() => {
    console.log("running");
    socket.on("connect", function() {
      // call the server-side function 'adduser' and send one parameter (value of prompt)
      socket.emit("adduser", [user.user_name, user.id]);
    });
  });

  return (
    <React.Fragment>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>
          <ListGroup>
            {userList.map((item, i) => (
              <ListGroupItem key={i}>name: {item.user_name}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 3 }}>{/*list of chat*/}</Col>
      </Row>
      <FormItem
        type="text"
        name="message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button onClick={sendMessage}>Send</Button>
      {/*run list of users here and each message*/}
    </React.Fragment>
  );
};

TestSocketFunc.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestSocketFunc);
