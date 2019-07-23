const express = require("express");
const router = express.Router();
const { Chat, Message, UserInfo } = require("../models/Chats");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("join", data => {
      data.roomIds.forEach(item => {
        socket.join(item);
        console.log("joined room: " + item);
      });
    });

    socket.on("sendMessage", data => {
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
        io.in(doc._id).emit("update", doc);
      });
    });

    socket.on("updateUnseen", data => {
      const { roomId, _id } = data;
      Chat.findById(roomId).then(doc => {
        doc.messages.map(item => {
          if (!item.messageSeenBy.includes(_id)) item.messageSeenBy.push(_id);
        });
        doc.save();
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return router;
};
