const express = require("express");
const router = express.Router();
const { Chat, Message } = require("../models/Chats");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post(
  "/newroom",
  passport.authenticate("userPass", {
    session: false
  }),
  (req, res) => {
    const { _id } = req.user;
    const { recieverId } = req.body;
    let newRoom = new Chat({
      userListIds: [_id, recieverId],
      messages: [],
      created_by: _id,
      updated_on: Date.now()
    });
    newRoom
      .save()
      .then(room => {
        res.status(200).json(room);
      })
      .catch(err => console.log(err));
  }
);

router.put(
  "/sendmessage",
  passport.authenticate("userPass", {
    session: false
  }),
  (req, res) => {
    const { _id, user_name, profile_image_url } = req.user;
    const { roomId, message } = req.body;
    let newMessage = new Message({
      text: message,
      user: _id,
      user_name: user_name,
      profile_image_url: profile_image_url
    });

    Chat.findByIdAndUpdate(
      roomId,
      {
        $push: { messages: newMessage },
        $set: { updated_on: Date.now() }
      },
      { new: true },
      (err, chat) => {
        if (err) console.log(err);
        res.status(200).json(chat);
      }
    );
  }
);

router.get(
  "/getmessages",
  passport.authenticate("userPass", {
    session: false
  }),
  (req, res) => {
    const { _id } = req.user;
    Chat.find({ userListIds: { $in: [_id] } })
      .sort({ updated_on: -1 })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
);

module.exports = router;
