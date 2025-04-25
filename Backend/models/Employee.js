const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: String,
  paid: {
    type: String,
    default: 'Paid'
  },
  salary: {
    type: Number,
    required: true,
  },
  trainerBankDetails: {
    accountHolder: { type: String },
    accountNumber: { type: String},
    bankName: { type: String, required: true },
    ifscCode: { type: String, required: true }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  paymentDate: {           // Added field for payment date
    type: String,
    default: 'NOT PAID YET'          // Default to null if not paid yet
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
