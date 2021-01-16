const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketTitle: {
    type: String,
    required: true,
  },
  assignedDev: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  ticketStatus: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  ticketDescript: {
    type: String,
    required: true,
  },
  submitted: {
    type: Boolean,
    required: true,
  },
  ticketPriority: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;