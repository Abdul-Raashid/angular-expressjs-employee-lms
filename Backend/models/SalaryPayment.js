const mongoose = require('mongoose');

const SalaryPaymentSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  Name: String,
  Salary: {
    type: Number
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'paid'
  }
});

module.exports = mongoose.model('SalaryPayment', SalaryPaymentSchema);
