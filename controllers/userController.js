const express = require('express');
const router = express.Router();
const db = require('../database');

// USER HOME ROUTE
router.get('/', (req, res) => {
  res.render('./user/dashboard');
});

// GET new ticket
router.get('/new', (req, res) => {
  res.render('./user/ticketnew');
})

// POST new ticket to database
router.post('/', (req, res) => {
  // db.Ticket.create(req.body, (err, newTicket) => {
  //     if(err) console.log(err);
  //   })
    res.redirect('./user/dashboard');
})

module.exports = router;