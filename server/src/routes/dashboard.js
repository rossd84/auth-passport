const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  res.status(200).json({ message: 'Welcome to your dashboard' });
});

module.exports = router;