const express = require('express');
const router = express.Router();
const db = require('../database');

// GET ticket show
router.get('/:id', (req, res) => {
  res.render('./ticket/ticketNew');
});


module.exports = router;