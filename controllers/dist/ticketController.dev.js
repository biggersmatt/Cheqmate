"use strict";

var express = require('express');

var router = express.Router();

var db = require('../database'); // Current route '/user/:id/ticket'
// GET new ticket


router.get('/:id/ticket/new', function (req, res) {
  var context = {
    url: req.originalUrl,
    userId: req.params.id
  };
  console.log(context);
  res.render('./ticket/ticketNew', context);
}); // POST new ticket to database

router.post('/:id/ticket', function (req, res) {
  console.log('New Ticket Created');
  db.Ticket.create(req.body, function (err, newTicket) {
    if (err) console.log(err);
    console.log(req.params.id);
    db.User.findById(req.params.id, function (err, foundUser) {
      if (err) console.log(err);
      foundUser.tickets.push(newTicket);
      foundUser.save(function (err, savedUser) {
        if (err) console.log(err);
        res.redirect("/user/".concat(savedUser._id));
      });
    });
  });
}); // GET show ticket

router.get('/:id/ticket/:ticketId', function (req, res) {
  var ticketId = req.params.ticketId;
  db.Ticket.findById(ticketId, function (err, foundTicket) {
    if (err) console.log(err);
    db.User.findById(req.params.id, function (err, foundUser) {
      if (err) console.log(err);
      var context = {
        ticket: foundTicket,
        user: foundUser
      };
      res.render('./ticket/ticketShow', context);
    });
  });
}); // GET edit ticket

router.get('/:id/ticket/:ticketId/edit', function (req, res) {
  var ticketId = req.params.ticketId;
  db.Ticket.findById(ticketId, function (err, foundTicket) {
    console.log(req.body);
    if (err) console.log(err);
    db.User.findById(req.params.id, function (err, foundUser) {
      if (err) console.log(err);
      var context = {
        ticket: foundTicket,
        user: foundUser
      };
      res.render('./ticket/ticketEdit', context);
    });
  });
}); // PUT ROUTE TO UPDATE TICKET

router.put('/:id/ticket/:ticketId', function (req, res) {
  var ticketId = req.params.ticketId;
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

router["delete"]('/:id/ticket/:ticketId', function (req, res) {
  var ticketId = req.params.ticketId;
  db.Ticket.findByIdAndDelete(ticketId, function (err, deletedTicket) {
    if (err) {
      res.send(err);
    }

    res.redirect("/user/".concat(req.params.id));
  });
});
module.exports = router;