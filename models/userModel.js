const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false }
  }
);

const User = mongoose.model('User', userModel);
module.exports = Ticket;
