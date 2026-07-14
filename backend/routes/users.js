const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

router.get('/all', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'User list endpoint' });
});

module.exports = router;
