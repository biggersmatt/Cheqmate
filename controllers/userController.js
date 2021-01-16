const express = require('express');
const router = express.Router();
const db = require('../database');

// USER HOME ROUTE
router.get('/', (req, res) => {
  res.render('main');
});

module.exports = router;