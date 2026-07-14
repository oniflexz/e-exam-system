const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Create question (teacher/admin)
router.post('/', authenticateToken, authorizeRole('teacher', 'admin'), (req, res) => {
  res.json({ message: 'Question created' });
});

// Get questions for exam
router.get('/exam/:examId', authenticateToken, (req, res) => {
  res.json({ message: 'Questions for exam' });
});

// Update question
router.put('/:id', authenticateToken, authorizeRole('teacher', 'admin'), (req, res) => {
  res.json({ message: 'Question updated' });
});

// Delete question
router.delete('/:id', authenticateToken, authorizeRole('teacher', 'admin'), (req, res) => {
  res.json({ message: 'Question deleted' });
});

module.exports = router;
