"use strict";

var express = require('express');

var router = express.Router();

var db = require('../database'); // Current route '/user/:id/ticket'
// GET new ticket


router.get('/new', function (req, res) {
  db.User.findById(req.params.id, function (err, foundUser) {
    if (err) console.log(err);
    var context = {
      user: foundUser
    };
    res.render('./ticket/ticketNew', context);
  });
}); // POST new ticket to database

router.post('/', function (req, res) {
  console.log('New Ticket Created');
  db.Ticket.create(req.body, function (err, newTicket) {
    if (err) console.log(err);
    res.redirect('/user/:id');
  });
}); // GET show ticket

router.get('/:id', function (req, res) {
  var ticketId = req.params.id;
  db.Ticket.findById(ticketId, function (err, foundTicket) {
    if (err) console.log(err);
    res.render('./ticket/ticketShow', {
      ticket: foundTicket
    });
  });
}); // GET edit ticket

router.get('/:id/edit', function (req, res) {
  var ticketId = req.params.id;
  db.Ticket.findById(ticketId, function (err, foundTicket) {
    console.log(req.body);
    if (err) console.log(err);
    var context = {
      ticket: foundTicket
    };
    res.render('./ticket/ticketEdit', context);
  });
}); // PUT ROUTE TO UPDATE TICKET

router.put('/:id', function (req, res) {
  var ticketId = req.params.id;
  var updatedTicketObj = {
    title: req.body.title,
    developer: req.body.developer,
    project: req.body.project,
    status: req.body.status,
    dueDate: req.body.dueDate,
    description: req.body.description,
    submitted: req.body.submitted,
    priority: req.body.priority
  };
  db.Ticket.findByIdAndUpdate(ticketId, updatedTicketObj, {
    "new": true
  }, function (err, updatedTicket) {
    if (err) {
      res.send(err);
    }

    res.redirect("./".concat(ticketId));
  });
}); // DELETE ROUTE AND REDIRECT TO USER HOME

router["delete"]('/:id', function (req, res) {
  var ticketId = req.params.id;
  db.Ticket.findByIdAndDelete(ticketId, function (err, deletedTicket) {
    if (err) {
      res.send(err);
    }

    res.redirect('/user/:id');
  });
});
module.exports = router;