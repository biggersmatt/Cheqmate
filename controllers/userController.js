const express = require('express');
const router = express.Router();
const db = require('../database');

// Current route '/user'

// Render Sign Up Page
router.get('/new', (req, res) => {
  res.render('./user/userNew');
})

/****POST****/
// Create New User
// Redirect to Login Page
router.post('/', (req, res) => {
  db.User.create(req.body, (err, userCreated) => {
    if(err) console.log(err);
    res.redirect('/');
  });
});

/****POST****/
// Submit Login Info
router.post('/login', (req, res) => {
  db.User.findOne({username: req.body.username}, (err, foundUser) => {
    if(err) console.log(err);
    if(!foundUser) res.redirect('/');
    if(foundUser.password === req.body.password) res.redirect(`/user/${foundUser.id}`);
    res.render('index');
  });
});

/****GET****/
// Populate Infomation for Dashboard
router.get('/:id', (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if(err) console.log(err);
    db.Ticket.find({user: req.params.id}, (err, userTickets) => {
      if(err) console.log(err);
      const context = {
        user: foundUser,
        tickets: userTickets,
        
      }
      res.render('./user/userShow', context);
    })
  });
});

module.exports = router;