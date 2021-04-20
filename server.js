const express = require('express');
// const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const PORT = process.env.PORT || 4000;
const userController = require('./controllers/userController');
const ticketController = require('./controllers/ticketController');

app.use(express.static(`${__dirname}/public`));

// VIEW ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json())
app.use(methodOverride('_method'));

// DEFAULT PATH
app.use('/user', userController);
app.use('/user', ticketController);

// DEFAULT PATH ON LOCALHOST
app.get('/', (req, res) => {
  res.render('index');
});

// ----------APP LISTEN ON PORT-----------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});