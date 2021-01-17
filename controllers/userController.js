const express = require('express');
const router = express.Router();
const db = require('../database');

// USER HOME ROUTE
router.get('/', (req, res) => {
  res.render('./user/dashboard');
});

// GET new ticket
router.get('/new', (req, res) => {
  res.render('./user/new');
})

module.exports = router;