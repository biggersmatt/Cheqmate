const express = require('express');
const router = express.Router();
const db = require('../database');

// Current route '/user'


// GET new user sign up page
router.get('/new', (req, res) => {
  res.render('./user/userNew');
})

// GET user show dashboard
router.get('/:id', (req, res) => {
  res.render('./user/userShow');
});

// POST new ticket to database
router.post('/', (req, res) => {
  // db.Ticket.create(req.body, (err, newTicket) => {
  //     if(err) console.log(err);
  //   })
    res.redirect('./user/dashboard');
})

module.exports = router;