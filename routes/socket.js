const express = require("express");
const router = express.Router();
const { Chat, Message, UserId } = require("../models/Chats");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("join", async data => {
      socket.join(data[0]);
      let { messages } = await Chat.findById(data[0])
        .select("messages")
        .then(data => {
          return data;
        });
      socket.emit("update", messages);
      socket.broadcast.to(data[0]).emit("update", messages);
    });

    socket.on("sendChat", async data => {
      const { roomId, text, user } = data;
      let newMessage = new Message({
        text: text,
        user: user.id,
        user_name: user.user_name,
        profile_image_url: user.profile_image_url,
        messageSeenBy: [user.id]
      });

      Chat.findByIdAndUpdate(
        roomId,
        {
          $push: { messages: newMessage },
          $set: { updated_on: Date.now() }
        },
        { new: true }
      ).then(doc => {
        io.in(doc._id).emit("update", doc.messages);
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return router;
};
