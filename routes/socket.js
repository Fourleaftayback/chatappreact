const express = require("express");
const router = express.Router();
const { Chat, Message, UserId } = require("../models/Chats");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("join", data => {
      console.log(data);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return router;
};
