const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
// const { downloadInvoicePDF } = require('../controllers/invoiceController');

router.get('/', invoiceController.getAllInvoices); // Define the GET route here
router.get('/invoices/download/:invoiceNumber', invoiceController.downloadInvoicePDF);
module.exports = router;
