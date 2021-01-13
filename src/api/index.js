const express = require('express');

const users = require('./users');
const rides = require('./rides');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌎',
  });
});

router.use('/users', users);
router.use('/rides', rides);

module.exports = router;
