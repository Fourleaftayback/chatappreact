const express = require("express");
const router = express.Router();
const userList = [];
const messageList = [];

module.exports = function(io) {
  io.on("connection", socket => {
    socket.on("sendchat", function(data) {
      // we tell the client to execute 'updatechat' with 2 parameters
      data.date = Date.now();
      messageList.push(data);
      socket.emit("updatechat", messageList);
      socket.broadcast.emit("updatechat", messageList);
    });

    // when the client emits 'adduser', this listens and executes
    socket.on("adduser", function(user) {
      console.log("connected");
      user.sessionId = socket.id;
      userList.push(user);
      socket.emit("updateusers", userList);
      socket.broadcast.emit("updateusers", userList);
    });

    // when the user disconnects.. perform this
    socket.on("disconnect", function() {
      let indx = userList.findIndex(item => item.sessionId === socket.id);
      userList.splice(indx, 1);

      socket.emit("updateusers", userList);
    });
  });

  return router;
};
