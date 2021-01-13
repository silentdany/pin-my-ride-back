const express = require('express');

const users = require('./users');
const auth = require('./auth.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌎',
  });
});

router.use('/login', auth);
router.use('/users', users);

module.exports = router;
