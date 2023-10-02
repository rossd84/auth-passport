const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const dashboardRoutes = require('./dashboard');

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
