const express = require("express");
const router = express.Router();
const { Chat, UserInfo } = require("../models/Chats");
const User = require("../models/User");
const passport = require("passport");

// GET  /messages/all
// get all messages that current user is involved in
// Private

router.get(
  "/all",
  passport.authenticate("userPass", {
    session: false
  }),
  (req, res) => {
    const { _id } = req.user;
    Chat.find({ userList: { $elemMatch: { _id: _id } } })
      .sort({ updated_on: -1 })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
);

//POST /messages/newroom
// Create new one on one chat room data
// Private
router.post(
  "/newroom",
  passport.authenticate("userPass", {
    session: false
  }),
  async (req, res) => {
    const { _id, profile_image_url, user_name } = req.user;
    const { recieverId } = req.body;
    const reciever = await User.findById(recieverId).select(
      "_id profile_image_url user_name"
    );
    let creatorInfo = new UserInfo({
      _id: _id,
      user_name: user_name,
      profile_image_url: profile_image_url
    });
    let recieverInfo = new UserInfo(reciever);

    let newRoom = new Chat({
      userList: [creatorInfo, recieverInfo],
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
      .catch(err => res.status(400).json({ errors: "something went wrong" }));
  }
);

router.post(
  "/newgroup",
  passport.authenticate("userPass", {
    session: false
  }),
  (req, res) => {
    const { _id, profile_image_url, user_name } = req.user;
    let creatorInfo = new UserInfo({
      _id: _id,
      user_name: user_name,
      profile_image_url: profile_image_url
    });
    let userListIds = req.body.userList
      .reduce((acc, item) => acc.concat(item._id), [])
      .concat(_id);
    let userList = req.body.userList
      .map(
        item =>
          new UserInfo({
            _id: item._id,
            user_name: item.user_name,
            profile_image_url: item.profile_image_url
          })
      )
      .concat(creatorInfo);

    const newGroup = new Chat({
      group_chat: true,
      chat_name: req.body.chat_name,
      userList: userList,
      userListIds: userListIds,
      messages: [],
      created_by: _id,
      updated_on: Date.now()
    });
    newGroup
      .save()
      .then(room => {
        res.status(200).json(room);
      })
      .catch(err => res.status(400).json({ errors: "something went wrong" }));
  }
);

module.exports = router;
