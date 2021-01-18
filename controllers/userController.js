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
  db.Ticket.find({}, (err, allTickets) => {
    if(err) console.log(err);
    const context = {
      tickets: allTickets,
    }
    res.render('./user/userShow', context);
  })
});


module.exports = router;