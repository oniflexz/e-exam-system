const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Create exam (teacher/admin only)
router.post('/', authenticateToken, authorizeRole('teacher', 'admin'), (req, res) => {
  res.json({ message: 'Exam created' });
});

// Get all exams
router.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'All exams' });
});

// Get exam by ID
router.get('/:id', authenticateToken, (req, res) => {
  res.json({ message: 'Exam details' });
});

// Start exam
router.post('/:id/start', authenticateToken, (req, res) => {
  res.json({ message: 'Exam started' });
});

// Submit exam
router.post('/:id/submit', authenticateToken, (req, res) => {
  res.json({ message: 'Exam submitted' });
});

module.exports = router;
