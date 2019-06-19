const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserInfo = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  profile_image_url: {
    type: String
  }
})

const Message = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  profile_image_url: {
    type: String
  }
})

const ChatSchema = new Schema({
  group_chat: {
    type: Boolean,
    required: true,
    default: false
  },
  userList: [UserInfo],
  messages: [Message],
  messages: {
    type: Array,
    required: true
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "chats"
});

const ChatSchema = mongoose.model('Chats', Chats);
const UserInfoSchema = mongoose.model('UserInfo', UserInfo);
const MessageSchema = mogoose.model('Message', Message);

module.exports = {
  Chat: ChatSchema,
  UserInfo: UserInfoSchema,
  Message: MessageSchema
}