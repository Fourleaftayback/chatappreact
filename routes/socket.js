const express = require("express");
const router = express.Router();
const { Chat, Message } = require("../models/Chats");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("join", data => {
      socket.join(data[0]);
      Chat.findById(data[0]).then(doc => {
        doc.messages.map(item => {
          if (!item.messageSeenBy.includes(data[1].id))
            item.messageSeenBy.push(data[1].id);
        });
        doc.save().then(newDoc => {
          //socket.emit("update", newDoc.messages);
          //socket.broadcast.to(data[0]).emit("update", newDoc.messages);
          io.in(data[0]).emit("update", newDoc.messages);
        });
      });
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
