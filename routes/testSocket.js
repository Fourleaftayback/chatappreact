const express = require("express");
const router = express.Router();
const userList = [];

module.exports = function(io) {
  io.on("connection", socket => {
    /*
    socket.on("sendchat", function(data) {
      // we tell the client to execute 'updatechat' with 2 parameters
      io.sockets.emit("updatechat", socket.username, data);
    }); */

    // when the client emits 'adduser', this listens and executes
    socket.on("adduser", function(user) {
      userList.push({ user_name: user[0], _id: user[1], sessionId: socket.id });
      console.log(userList);
      //console.log(user.user_name + " has connected");
      //console.log(userList);
      //socket.username = username;
      // add the client's username to the global list
      //usernames[username] = username;
      // echo to client they've connected
      //console.log(usernames);
      /*
      socket.emit("updatechat", "SERVER", "you have connected");
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit(
        "updatechat",
        "SERVER",
        username + " has connected"
      );
      // update the list of users in chat, client-side
      io.sockets.emit("updateusers", usernames); */
    });

    // when the user disconnects.. perform this
    socket.on("disconnect", function() {
      let indx = userList.findIndex(item => item.sessionId === socket.id);
      console.log(userList[indx].user_name + "disconnected");
      userList.splice(indx, 1);
      console.log(userList);
      // remove the username from global usernames list
      /*
      delete usernames[socket.username];
      // update list of users in chat, client-side
      io.sockets.emit("updateusers", usernames);
      // echo globally that this client has left
      socket.broadcast.emit(
        "updatechat",
        "SERVER",
        socket.username + " has disconnected"
      ); */
    });
    /*
    socket.on("create", room => {
      socket.join(room);
      console.log(`joined ${room}`);
    });
    
    socket.on("change color", color => {
      // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
      // we make use of the socket.emit method again with the argument given to use from the callback function above
      console.log("Color Changed to: ", color);
      io.sockets.emit("change color", color);
    }); 
    // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
      console.log("user disconnected");
    }); */
  });

  return router;
};
