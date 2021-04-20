const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  developer: {
    type: String,
    // required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  // project: {
  //   type: String,
  //   // required: true,
  // },
  // status: {
  //   type: String,
  //   // required: true,
  // },
  // dueDate: {
  //   type: Date,
  //   // required: true,
  // },
  // description: {
  //   type: String,
  //   // required: true,
  // },
  // submitted: {
  //   type: String,
  // },
  // priority: {
  //   type: String,
  //   // required: true,
  // },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;