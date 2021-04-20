const express = require('express');
const router = express.Router();
const db = require('../database');

// Current route '/user'

// Render New Ticket Page
router.get('/:id/ticket/new', (req, res) => {
  const context = {
    userId: req.params.id,
  }
  res.render('./ticket/ticketNew', context);
});

/****POST****/
// Create New Ticket
// Push to User's Tickets Array
router.post('/:id/ticket', (req, res) => {
  ticket = {
    title: req.body.title,
    developer: req.body.developer,
    status: req.body.status,
    user: req.params.id,
  }
  db.Ticket.create(ticket, (err, newTicket) => {
    if(err) console.log(err);
    res.redirect(`/user/${req.params.id}`);
  });
});

// Render Ticket Show Page
router.get('/:id/ticket/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  db.Ticket.findById(ticketId, (err, foundTicket) => {
    if(err) console.log(err);
    db.User.findById(req.params.id, (err, foundUser) => {
      if(err) console.log(err);
      const context = {
        ticket: foundTicket,
        user: foundUser
      }
      res.render('./ticket/ticketShow', context);
    });
  });
});

// Render Ticket Edit Page
router.get('/:id/ticket/:ticketId/edit', (req, res) => {
  const ticketId = req.params.ticketId;
  db.Ticket.findById(ticketId, (err, foundTicket) => {
    if(err) console.log(err);
    db.User.findById(req.params.id, (err, foundUser) => {
      if(err) console.log(err);
      const context = {
        ticket: foundTicket,
        user: foundUser
      }
      res.render('./ticket/ticketEdit', context);
    });
  });
});

/****PUT****/
// Submit Update to Ticket
router.put('/:id/ticket/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  const updatedTicketObj = {
    title: req.body.title,
    developer: req.body.developer,
  };
  db.Ticket.findByIdAndUpdate(ticketId, updatedTicketObj, 
  {new: true}, 
  (err, updatedTicket) => {
    if(err) console.log(err);
    res.redirect(`./${ticketId}`);
  });
});

/****DELETE****/
// Delete Ticket
// Redirect to Dashboard
router.delete('/:id/ticket/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  db.Ticket.findByIdAndDelete(ticketId, (err, deletedTicket) => {
    if(err) console.log(err);
    res.redirect(`/user/${req.params.id}`);
  });
});

module.exports = router;