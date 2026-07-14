const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Get student results
router.get('/my-results', authenticateToken, (req, res) => {
  res.json({ message: 'Student results' });
});

// Get exam results (teacher/admin)
router.get('/exam/:examId', authenticateToken, authorizeRole('teacher', 'admin'), (req, res) => {
  res.json({ message: 'Exam results' });
});

// Get detailed result
router.get('/:id', authenticateToken, (req, res) => {
  res.json({ message: 'Result details' });
});

module.exports = router;
