const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = new Schema({
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

const chat = new Schema(
  {
    group_chat: {
      type: Boolean,
      required: true,
      default: false
    },
    chat_name: {
      type: String
    },
    userListIds: [String],
    messages: [message],
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    created_on: {
      type: Date,
      default: Date.now
    },
    updated_on: {
      type: Date,
      required: true
    }
  },
  {
    collection: "chats"
  }
);

const chatSchema = mongoose.model("chat", chat);
const messageSchema = mongoose.model("message", message);

module.exports = {
  Chat: chatSchema,
  Message: messageSchema
};
