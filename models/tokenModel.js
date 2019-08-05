const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenModel = new Schema(
  {
    name: String,
    token: String,
    roles: [String]
  }
);

const Token = mongoose.model('Token', tokenModel);
module.exports = Token;
