const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  }],
  // name: {
  //   type: String,
  // },
  // email: {
  //   type: String,
  //   // required: true,
  // },
    // required: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;