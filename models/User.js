const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tickets: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;