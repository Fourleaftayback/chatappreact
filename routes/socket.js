const express = require("express");
const router = express.Router();
const { Chat, Message, UserId } = require("../models/Chats");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("joinChat", data => {});
  });
  return router;
};
