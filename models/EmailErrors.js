const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EmailErrorsSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  logged_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  error: {
    type: Object,
    required: true
  }
});

module.exports = EmailErrors = mongoose.model("emailErrors", EmailErrorsSchema);