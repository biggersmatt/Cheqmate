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
    if(!userCreated) res.redirect('/user/new');
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