const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema(
  {
    url: String,
    username: String,
    password: String,
    email: String,
    groups: [String]
  }
);

const User = mongoose.model('User', userModel);
module.exports = User;
