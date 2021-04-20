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
router.post('/', (req, res) => {
  db.User.create(req.body, (err, userCreated) => {
    if(err) console.log(err);
    // res.send(userCreated);
    // if(!userCreated) res.redirect('/user/new');
    res.redirect('/');
  });
});

// POST ROUTE to handle User Login Form
router.post('/login', (req, res) => {
  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if(err) console.log(err);
    if(!foundUser) res.redirect('/');
    // Verify the submitted email and password match
    if(foundUser.password === req.body.password) res.redirect(`/user/${foundUser.id}`);
    res.render('index');
  });
});

// GET user show dashboard
router.get('/:id', (req, res) => {
  db.User.findById(req.params.id)
    .populate('tickets')
    .exec((err, foundUser) => {
      if(err) console.log(err);
      const context = {
        user: foundUser,
      }
      res.render('./user/userShow', context);
    });
  });

module.exports = router;