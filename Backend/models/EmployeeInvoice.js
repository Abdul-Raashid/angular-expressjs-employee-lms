const mongoose = require('mongoose');

const employeeInvoiceSchema = new mongoose.Schema({
  purchaseOrderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PurchaseOrder', 
    required: true, 
    unique: true 
  },
  invoiceNumber: { 
    type: String, 
    required: true 
  },
  pdfFilePath: { 
    type: String, 
    required: true 
  },
  clientDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  trainerDetails: {
    name: { type: String, required: true },
    address: { type: String, default: "N/A" },
    bankDetails: { type: String, default: "N/A" }
  },
  courseDetails: {
    courseName: { type: String, required: true },
    startDate: { type: Date, required: true },
    numberOfDays: { type: Number, required: true },
    dailyCost: { type: Number, required: true },
    trainerCost: { type: Number, required: true },
    totalCost: { type: Number, required: true }
  },
  taxSummary: {
    subtotal: { type: Number, required: true },
    taxRate: { type: String, default: "18%" },
    taxAmount: { type: Number, required: true },
    totalWithTax: { type: Number, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

// Export with a unique model name to avoid conflicts
module.exports = mongoose.models.EmployeeInvoice || mongoose.model('EmployeeInvoice', employeeInvoiceSchema);
