const express = require("express");
const router = express.Router();
const { Chat, Message, UserInfo } = require("../models/Chats");

module.exports = io => {
  io.on("connection", socket => {
    console.log("connected");
    socket.on("join", data => {
      data.roomIds.forEach(item => {
        socket.join(item);
        console.log("joined room: " + item);
      });
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return router;
};
