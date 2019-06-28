const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");

// @route   GET /list/alluser
// @desc    gives list of all users except the current user in alphabetical order
// @access  Private

router.get(
  "/allusers",
  passport.authenticate("userPass", {
    session: false
  }),
  (req, res) => {
    User.find({
      _id: {
        $ne: req.user.id
      }
    })
      .select("-resetPasswordExp -resetPasswordToken")
      .sort("user_name")
      .then(users => {
        return res.status(200).json(users);
      })
      .catch(err =>
        res.status(400).json({
          error: "could not get users"
        })
      );
  }
);

// @route   GET /list/search?=username
// @desc    return list of users based on the search request
// @access  Private
router.get(
  "/search",
  passport.authenticate("userPass", {
    session: false
  }),
  (req, res) => {
    let username = req.query.username;
    if (username === undefined || username === "")
      return res.status(422).json({
        search: "Invalid search request"
      });
    username.toLowerCase();
    User.find({
      user_name: {
        $regex: username,
        $options: "i"
      }
    })
      .sort("user_name")
      .select("-resetPasswordExp -resetPasswordToken")
      .then(users => {
        return res.status(200).json(users);
      })
      .catch(err =>
        res.status(400).json({
          error: "something went wrong"
        })
      );
  }
);
module.exports = router;
