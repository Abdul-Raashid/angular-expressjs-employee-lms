// routes/dashboard.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Define the route for dashboard
router.get('/dashboard', dashboardController.getDashboardData);

module.exports = router;
