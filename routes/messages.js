const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Chat = require("../models/Chats");

// @route   POST /message/
// @desc    user registration
// @access  Public