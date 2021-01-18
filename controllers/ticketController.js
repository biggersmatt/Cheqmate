const express = require('express');
const router = express.Router();
const db = require('../database');

// Current route '/user/:id/ticket'

// GET new ticket
router.get('/new', (req, res) => {
  res.render('./ticket/ticketNew');
});

// POST new ticket to database
router.post('/', (req, res) => {
  console.log('New Ticket Created')
  db.Ticket.create(req.body, (err, newTicket) => {
    if(err) console.log(err);
    res.redirect('/user/:id');
  })
})

// GET show ticket
router.get('/:id/showTicket', (req, res) => {
  const ticketId = req.params.id;
  db.Ticket.findById(ticketId, (err, foundTicket) => {
    if (err) {
      res.send(err);
    }
    res.render('./ticket/ticketShow', {
      ticket: foundTicket,
    });
  });
});

// GET edit ticket
router.get('/:id/ticket/', (req, res) => {
  const ticketId = req.params.id;
  db.Ticket.findById(ticketId, (err, foundTicket) => {
    if (err) {
    console.log(err);
    }
    res.render('./ticket/ticketEdit', {
      ticket: foundTicket,
    });
  });
});

// PUT ROUTE TO UPDATE TICKET
router.put('/:id', (req, res) => {
  const ticketId = req.params.id;
  const updatedTicketObj = {
    ticketTitle: req.body.ticketTitle,
    assignedDev: req.body.assignedDev,
    project: req.body.project,
    ticketStatus: req.body.ticketStatus,
    created: req.body.created,
    ticketDescript: req.body.ticketDescript,
    submitted: req.body.submitted,
    ticketPriority: req.body.ticketPriority
  };
  
  db.Ticket.findByIdAndUpdate(ticketId, updatedTicketObj, 
    {new: true}, 
    (err, updatedTicket) => {
      if (err) {
        res.send(err);
      }
      res.redirect(`./ticketShow/${ticketId}`);
    });
});

// DELETE ROUTE AND REDIRECT TO USER HOME
router.delete('/:id', (req, res) => {
  const ticketId = req.params.id;
  db.Ticket.findByIdAndDelete(ticketId, (err, deletedTicket) => {
    if(err) {
      res.send(err);
    }
    res.redirect('./user/userShow');
  });
});




module.exports = router;