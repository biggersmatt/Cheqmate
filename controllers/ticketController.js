const express = require('express');
const router = express.Router();
const db = require('../database');

// Current route '/user/:id/ticket'

// GET new ticket
router.get('/new', (req, res) => {
  res.render('./ticket/ticketNew');
});

// GET show ticket
router.get('/:id', (req, res) => {
  res.render('./ticket/ticketShow');
});

// GET edit ticket
router.get('/:id/edit', (req, res) => {
  const ticketId = req.params.id;
  db.Ticket.findByIdAndUpdate(ticketId, (err, foundTicket) => {
    if (err) {
    res.send(err);
    }
    res.render('./ticket/ticketEdit'< {
      ticket: foundTicket
    });
  });
});




module.exports = router;