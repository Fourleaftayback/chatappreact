const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserId = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

const Message = new Schema({
  text: { type: String, required: true, default: "" },
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
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const ChatSchema = new Schema(
  {
    group_chat: {
      type: Boolean,
      required: true,
      default: false
    },
    chat_name: {
      type: String,
      required: true
    },
    userListIds: [UserIds],
    messages: [Message],
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    created_on: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "chats"
  }
);

const ChatSchema = mongoose.model("Chats", Chats);
const UserIdSchema = mongoose.model("UserId", UserId);
const MessageSchema = mogoose.model("Message", Message);

module.exports = {
  Chat: ChatSchema,
  UserId: UserIdSchema,
  Message: MessageSchema
};
