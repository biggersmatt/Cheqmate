"use strict";

var express = require('express');

var router = express.Router();

var db = require('../database'); // Current route '/user'
// GET new user sign up page


router.get('/new', function (req, res) {
  res.render('./user/userNew');
}); // POST ROUTE to create new user

router.post('/', function (req, res) {
  console.log('New User Created');
  db.User.create(req.body, function (err, userCreated) {
    if (err) {
      console.log(err);
    }

    res.redirect('./user/userLogin');
  });
}); // POST ROUTE to handle User Login Form

router.post('/login', function (req, res) {
  db.User.findOne({
    email: req.body.email
  }, function (err, foundUser) {
    if (err) {
      console.log(err);
    }

    if (!foundUser) {
      return res.render('index');
    } // Verify the submitted email and password match


    if (foundUser.password === req.body.password) {
      return res.redirect("/user/".concat(foundUser.id));
    }

    res.render('index');
  });
}); // GET user show dashboard

router.get('/:id', function (req, res) {
  db.Ticket.find({}, function (err, allTickets) {
    if (err) console.log(err);
    var context = {
      ticket: allTickets
    };
    res.render('./user/userShow', context);
  });
});
module.exports = router;