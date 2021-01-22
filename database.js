const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb+srv://joeyg:1234@sei-cluster-0.besro.mongodb.net/cheqmate?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

module.exports = {
  Ticket: require('./models/Ticket'),
  User: require('./models/User'),
};