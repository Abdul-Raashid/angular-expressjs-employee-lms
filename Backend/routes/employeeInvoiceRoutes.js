const express = require('express');
const router = express.Router();
const employeeInvoiceController = require('../controllers/employeeInvoiceController');

// Get all employee-related invoices (create if not exists)
router.get('/all', employeeInvoiceController.getAllInvoices);

// Download PDF by invoice number
router.get('/download/:invoiceNumber', employeeInvoiceController.downloadInvoicePDF);

module.exports = router;
