"use strict";

var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  developer: {
    type: String,
    required: true
  },
  project: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  submitted: {
    type: String
  },
  priority: {
    type: String,
    required: true
  }
});
var Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;