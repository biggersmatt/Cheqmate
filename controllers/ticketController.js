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
  res.render('./ticket/ticketEdit');
});




module.exports = router;