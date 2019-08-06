const express = require("express");
const router = express.Router();
const { Chat, Message, UserInfo } = require("../models/Chats");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("join", data => {
      data.roomIds.forEach(item => {
        socket.join(item);
        // console.log("joined room: " + item);
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
      //update room only
      Chat.findByIdAndUpdate(
        roomId,
        {
          $push: { messages: newMessage },
          $set: { updated_on: Date.now() }
        },
        { new: true }
      ).then(doc => {
        io.in(doc._id).emit("updateRoom", doc);
      });
      //update all data for sender only
      Chat.find({ userList: { $elemMatch: { _id: user.id } } })
        .sort({ updated_on: -1 })
        .then(data => {
          socket.emit("updateAllRooms", data);
        })
        .catch(err => {
          console.log(err);
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

    socket.on("addGroupMemebers", data => {
      const { roomId, users } = data;
      let userIds = users.map(item => item._id);
      let userArr = users.map(item => {
        return new UserInfo({
          _id: item._id,
          user_name: item.user_name,
          profile_image_url: item.profile_image_url
        });
      });
      Chat.findById(roomId).then(doc => {
        doc.userListIds = doc.userListIds.concat(userIds);
        doc.userList = doc.userList.concat(userArr);
        doc.save(err => {
          if (err) console.log(error);
          io.in(roomId).emit("updateGroup", doc);
        });
      });
    });

    socket.on("disconnect", () => {
      // console.log("user disconnected");
    });
  });
  return router;
};
