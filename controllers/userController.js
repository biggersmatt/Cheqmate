const express = require('express');
const router = express.Router();
const db = require('../database');

// Current route '/user'


// GET new user sign up page
router.get('/new', (req, res) => {
  res.render('./user/userNew');
})

// POST ROUTE to create new user
router.post('/', (req, res) => {
  console.log('New User Created');
  db.User.create(req.body, (err, userCreated) => {
    if(err) console.log(err);
    res.redirect('/');
  });
});

// POST to check login creditionals
router.post('/login', (req, res) => {
  db.User.findOne({name: req.body.name}, (err, foundUser) => {
    if(err) console.log(err);
    if(!foundUser) {
      return res.render('index');
    }
    if(foundUser.password === req.body.password) {
      return res.redirect(`/user/${foundUser._id}`);
    }
    res.render('index');
  })
})

// GET user show dashboard
router.get('/:id', (req, res) => {
  db.Ticket.find({}, (err, allTickets) => {
    if(err) console.log(err);
    const context = {
      ticket: allTickets,
    }
    res.render('./user/userShow', context);
  })
});


module.exports = router;