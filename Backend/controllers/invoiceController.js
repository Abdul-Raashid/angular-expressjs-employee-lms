const PurchaseOrder = require('../models/PurchaseOrder');
const Employee = require('../models/Employee');
const Company = require('../models/Company');
const Invoice = require('../models/companyInvoice'); // Import the Invoice model
const generateInvoicePDF = require('../utils/generateInvoicePDF');
const path = require('path');
const fs = require('fs');
const os = require('os'); // Import os module to get temporary directory

exports.getAllInvoices = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find();
    if (!purchaseOrders || purchaseOrders.length === 0) {
      return res.status(404).json({ message: 'No Purchase Orders found' });
    }

    const company = await Company.findOne(); // Assuming a single company profile
    if (!company) return res.status(404).json({ message: 'Company not found' });

    const invoices = await Promise.all(purchaseOrders.map(async (po) => {
      // Check if an invoice already exists for this purchase order
      const existingInvoice = await Invoice.findOne({ purchaseOrderId: po._id });

      if (existingInvoice) {
        console.log(`Invoice already exists for PurchaseOrder ID: ${po._id}`);
        
        // Log the existing invoice to check its fields
        console.log('Existing Invoice Data:', existingInvoice);

        // Return full invoice data from the existing invoice
        return {
          invoiceNumber: existingInvoice.invoiceNumber,
          pdfFilePath: existingInvoice.pdfFilePath,
          clientDetails: existingInvoice.clientDetails,
          trainerDetails: existingInvoice.trainerDetails,
          courseDetails: existingInvoice.courseDetails,
          taxSummary: existingInvoice.taxSummary,
          startDate: po.startDate
        };
      }

      // If no invoice exists, proceed with creating a new one
      const trainer = await Employee.findOne({ name: po.trainerName });
      if (!trainer) {
        console.log('Trainer not found for PurchaseOrder:', po._id);
        return { message: `Trainer not found for purchase order ${po._id}` };
      }

      const invoiceDate = new Date();
      const uniqueSuffix = Math.floor(Math.random() * 1000);  // Add a random number to ensure uniqueness
      const invoiceNumber = `INV-${invoiceDate.toISOString().replace(/[-T:.Z]/g, '').slice(0, 14)}-${uniqueSuffix}`;

      const taxRate = 0.18;
      const taxAmount = po.totalCost * taxRate;
      const totalWithTax = po.totalCost + taxAmount;

      // Prepare the invoice data
      const invoiceData = {
        invoiceNumber,
        invoiceDate: invoiceDate.toISOString().split('T')[0],
        clientDetails: {
          name: company.name,
          address: company.address,
          email: company.email,
          phone: company.phone,
        },
        trainerDetails: {
          name: trainer.name,
          address: trainer.trainerAddress || "N/A",
        },
        courseDetails: {
          courseName: po.courseName,
          startDate: po.startDate,
          numberOfDays: po.numberOfDays,
          dailyCost: po.dailyCost,
          trainerCost: po.trainerCost,
          totalCost: po.totalCost
        },
        taxSummary: {
          subtotal: po.totalCost,
          taxRate: "18%",
          taxAmount,
          totalWithTax
        },
        bankDetails: trainer.trainerBankDetails,
        terms: [
          "Payment due within 15 days",
          "Taxes included as per applicable laws",
          "Non-refundable after training start"
        ]
      };

      // Generate the PDF and save it to the server
      const pdfFilePath = path.join(os.tmpdir(), `${invoiceNumber}.pdf`);
      await generateInvoicePDF(invoiceData, po, pdfFilePath);

      // Save the new invoice to the database
      const newInvoice = await Invoice.create({
        purchaseOrderId: po._id,
        invoiceNumber,
        pdfFilePath,
        clientDetails: invoiceData.clientDetails,
        trainerDetails: invoiceData.trainerDetails,
        courseDetails: invoiceData.courseDetails,
        taxSummary: invoiceData.taxSummary
      });

      return {
        invoiceNumber,
        pdfFilePath,
        clientDetails: invoiceData.clientDetails,
        trainerDetails: invoiceData.trainerDetails,
        courseDetails: invoiceData.courseDetails,
        taxSummary: invoiceData.taxSummary,
        startDate: po.startDate
      };
    }));

    res.status(200).json(invoices);
  } catch (error) {
    console.error('❌ Error generating invoices:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.downloadInvoicePDF = (req, res) => {
  try {
    const { invoiceNumber } = req.params;  // Get invoice number from URL parameters
    const filePath = path.join(os.tmpdir(), `${invoiceNumber}.pdf`);  // Path to the generated PDF file
    
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Serve the file for download
      res.download(filePath, `${invoiceNumber}.pdf`, (err) => {
        if (err) {
          console.error('❌ Error sending file:', err);
          res.status(500).send('Failed to send the PDF file.');
        }
      });
    } else {
      res.status(404).json({ message: 'Invoice PDF not found.' });
    }
  } catch (error) {
    console.error('❌ Error downloading invoice:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
