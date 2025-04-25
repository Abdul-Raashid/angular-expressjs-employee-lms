const mongoose = require('mongoose');

const financeSummarySchema = new mongoose.Schema({
  currentBudget: {
    type: Number,
    default: 0
  },
  cumulativeRevenue: {
    type: Number,
    default: 0
  },
  cumulativeCost: {
    type: Number,
    default: 0
  },
  profit: {
    type: Number,
    default: 0
  }
}, { _id: false });

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  email: String,
  phone: String,

  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },

  financeSummary: {
    type: financeSummarySchema,
    default: () => ({})
  }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
module.exports = Company;

