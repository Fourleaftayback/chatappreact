const express = require("express");
const router = express.Router();
const { Chat, Message } = require("../models/Chats");
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
    Chat.find({ userListIds: { $elemMatch: { _id: _id } } })
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
