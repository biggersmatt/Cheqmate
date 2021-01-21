const express = require('express');
const router = express.Router();
const db = require('../database');

// Current route '/user/:id/ticket'

// GET new ticket
router.get('/new', (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) console.log(err);
    const context = {
      user: foundUser
    }
    res.render('./ticket/ticketNew', context);
  });
 
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
router.get('/:id', (req, res) => {
  const ticketId = req.params.id;
  db.Ticket.findById(ticketId, (err, foundTicket) => {
    if (err) console.log(err);
    res.render('./ticket/ticketShow', {
      ticket: foundTicket,
    });
  });
});

// GET edit ticket
router.get('/:id/edit', (req, res) => {
  const ticketId = req.params.id;
  db.Ticket.findById(ticketId, (err, foundTicket) => {
    console.log(req.body)
    if(err) console.log(err);
    const context = {
      ticket: foundTicket,
    }
    res.render('./ticket/ticketEdit', context);
  });
});

// PUT ROUTE TO UPDATE TICKET
router.put('/:id', (req, res) => {
  const ticketId = req.params.id;
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
      if (err) {
        res.send(err);
      }
      res.redirect(`./${ticketId}`);
    });
});

// DELETE ROUTE AND REDIRECT TO USER HOME
router.delete('/:id', (req, res) => {
  const ticketId = req.params.id;
  db.Ticket.findByIdAndDelete(ticketId, (err, deletedTicket) => {
    if(err) {
      res.send(err);
    }
    res.redirect('/user/:id');
  });
});




module.exports = router;