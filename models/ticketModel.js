const mongoose = require('mongoose');

const { Schema } = mongoose;

const ticketModel = new Schema(
  {
    detection: Number,
    actor: String,
    plan: String,
    file_set: [String],
    date: Date,
    is_starred: Boolean,
    subject: String,
    description: String,
    severity: Number,
    is_incident: Boolean,
    is_major: Boolean,
    status: String,
    confidentiality: Number,
    category: Number,
    opened_by: Number,
    concerned_business_lines: [String]
  }
);

const Ticket = mongoose.model('Ticket', ticketModel);
module.exports = Ticket;
