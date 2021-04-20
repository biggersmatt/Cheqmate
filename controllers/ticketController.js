const express = require('express');
const router = express.Router();
const db = require('../database');

// Current route '/user/:id/ticket'

// GET new ticket
router.get('/:id/ticket/new', (req, res) => {
  const context = {
    userId: req.params.id,
  }
  res.render('./ticket/ticketNew', context);
});

// POST new ticket to database
router.post('/:id/ticket', (req, res) => {
  db.Ticket.create(req.body, (err, newTicket) => {
    if(err) console.log(err);
    db.User.findById(req.params.id, (err, foundUser) => {
      if(err) console.log(err);
      foundUser.tickets.push(newTicket);
      foundUser.save((err, savedUser) => {
        if(err) console.log(err);
        res.redirect(`/user/${savedUser._id}`);
      });
    });
  });
});

// GET show ticket
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

// GET edit ticket
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

// PUT ROUTE TO UPDATE TICKET
router.put('/:id/ticket/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  const updatedTicketObj = {
    title: req.body.title,
    developer: req.body.developer,
    project: req.body.project,
    status: req.body.status,
    dueDate: req.body.dueDate,
    description: req.body.description,
    submitted: req.body.submitted,
    priority: req.body.priority
  };
  db.Ticket.findByIdAndUpdate(ticketId, updatedTicketObj, 
  {new: true}, 
  (err, updatedTicket) => {
    // might need to bit console.log instead of res.send
    if(err) res.send(err);
    res.redirect(`./${ticketId}`);
  });
});

// DELETE ROUTE AND REDIRECT TO USER HOME
router.delete('/:id/ticket/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  db.Ticket.findByIdAndDelete(ticketId, (err, deletedTicket) => {
    // might need to bit console.log instead of res.send
    if(err) res.send(err);
    res.redirect(`/user/${req.params.id}`);
  });
});

module.exports = router;