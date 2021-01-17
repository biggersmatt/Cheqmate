const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const PORT = 4000;
const userController = require('./controllers/userController');
require('./database');


// VIEW ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// DEFAULT PATH
app.use('/user', userController);
// app.use('/user/ticket', ticketController);

// DEFAULT PATH ON LOCALHOST
app.get('/', (req, res) => {
  res.render('index');
});

// ----------APP LISTEN ON PORT-----------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});