"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var methodOverride = require('method-override');

var app = express(); // process.env.PORT

var PORT = 4000;

var userController = require('./controllers/userController');

var ticketController = require('./controllers/ticketController');

app.use(express["static"]("".concat(__dirname, "/public"))); // VIEW ENGINE

app.set('view engine', 'ejs'); // MIDDLEWARE

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method')); // DEFAULT PATH

app.use('/user', userController);
app.use('/user', ticketController); // DEFAULT PATH ON LOCALHOST

app.get('/', function (req, res) {
  res.render('index');
}); // ----------APP LISTEN ON PORT-----------------

app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});