const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  developer: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;