// routes/finance.js
const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

router.post('/company', financeController.createCompany);
router.get('/company', financeController.getCompanyFinance);


module.exports = router;
