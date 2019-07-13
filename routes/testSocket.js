const express = require("express");
const router = express.Router();
const chatData = [];

module.exports = function(io) {
  io.on("connection", socket => {
    socket.on("sendchat", function(data) {
      data.date = Date.now();
      let indx = chatData.findIndex(item => item.roomId === data.roomId);
      let roomId = data.roomId;
      data.roomId = undefined;
      chatData[indx].messageList.push(data);
      socket.emit("updatechat", chatData[indx].messageList);
      socket.broadcast
        .to(roomId)
        .emit("updatechat", chatData[indx].messageList);
    });

    // when the client emits 'adduser', this listens and executes
    socket.on("adduser", user => {
      user[1].sessionId = socket.id;
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
      let roomIndx = chatData.findIndex(item =>
        item.userList.find(x => x.sessionId === socket.id) ? true : false
      );
      chatData[roomIndx].userList.forEach((item, i) => {
        if (item.sessionId === socket.id) {
          chatData[roomIndx].userList.splice(i, 1);
        }
      });

      if (chatData[roomIndx].userList.length === 0) {
        chatData.splice(roomIndx, 1);
      } else {
        socket
          .to(chatData[roomIndx].roomId)
          .emit("updateusers", chatData[roomIndx].userList);
        socket.broadcast
          .to(chatData[roomIndx].roomId)
          .emit("updateusers", chatData[roomIndx].userList);
      }
    });
  });

  return router;
};
