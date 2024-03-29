const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseHidden = require("mongoose-hidden")();

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    hide: true
  },
  profile_image_url: {
    type: String,
    default: ""
  },
  created_on: {
    type: Date,
    default: Date.now,
    hide: true
  },
  resetPasswordToken: {
    type: String,
    default: undefined
  },
  resetPasswordExp: {
    type: Date,
    default: undefined
  },
  auth_type: {
    type: String,
    required: true,
    default: "local"
  },
  facebook_id: {
    type: String,
    required: false
  }
});

UserSchema.plugin(mongooseHidden, {
  hidden: {
    _id: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
