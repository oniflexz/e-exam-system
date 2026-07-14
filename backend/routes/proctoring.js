const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Start proctoring session
router.post('/start', authenticateToken, (req, res) => {
  res.json({ message: 'Proctoring started' });
});

// Log suspicious activity
router.post('/activity', authenticateToken, (req, res) => {
  res.json({ message: 'Activity logged' });
});

// Get proctoring report
router.get('/report/:examId', authenticateToken, (req, res) => {
  res.json({ message: 'Proctoring report' });
});

module.exports = router;
