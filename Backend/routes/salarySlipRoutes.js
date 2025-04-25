const express = require('express');
const router = express.Router();
const salarySlipController = require('../controllers/salarySlipController');

router.get('/', salarySlipController.getAllSlips);
router.get('/employee/:employeeId', salarySlipController.getSlipsByEmployee);
router.get('/employee/:employeeId/month/:month', salarySlipController.getSlipByEmployeeAndMonth);

module.exports = router;
