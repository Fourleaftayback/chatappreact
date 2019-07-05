const express = require("express");
const router = express.Router();
//const userList = [];
//const messageList = [];
const chatData = [];

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
    socket.on("adduser", user => {
      console.log("connected");
      user[1].sessionId = socket.id;
      //check to see if room exist already if not create new room
      let indx = chatData.findIndex(item => item.roomId === user[0]);
      if (indx === -1) {
        chatData.push({
          roomId: user[0],
          userList: [user[1]],
          messageList: []
        });
        socket.join(user[0]);
        let curIndx = chatData.findIndex(item => item.roomId === user[0]);
        socket.emit("updateusers", chatData[curIndx].userList);
        socket.broadcast
          .to(user[0])
          .emit("updateusers", chatData[curIndx].userList);
      } else {
        chatData[indx].userList.push(user[1]);
        socket.join(user[0]);
        socket.emit("updateusers", chatData[indx].userList);
        socket.broadcast
          .to(user[0])
          .emit("updateusers", chatData[indx].userList);
      }
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
