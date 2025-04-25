const mongoose = require('mongoose');

// SalarySlip Schema
const salarySlipSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeName: {
    type: String,
    required: true
  },
  trainerCost: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },
  remarks: {
    type: String,
    default: "Payment for training services"
  },
  generatedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create model for SalarySlip
const SalarySlip = mongoose.model('SalarySlip', salarySlipSchema);
module.exports = SalarySlip;
