const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');

// Pay salary
router.post('/pay', salaryController.paySalary);

// Get all salary payments
router.get('/', salaryController.getAllSalaryPayments);

module.exports = router;
