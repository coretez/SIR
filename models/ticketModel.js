const mongoose = require('mongoose');

const { Schema } = mongoose;

const ticketModel = new Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false }
  }
);

const Ticket = mongoose.model('Ticket', ticketModel);
module.exports = Ticket;
