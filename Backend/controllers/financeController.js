// controllers/financeController.js
const Company = require('../models/Company'); 

// Create company (one-time setup)
exports.createCompany = async (req, res) => {
  try {
    const existing = await Company.findOne();
    if (existing) {
      return res.status(400).json({ message: 'Company already exists. Creation is not allowed more than once.' });
    }

    // Create the company if none exists
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getCompanyFinance = async (req, res) => {
    try {
      const company = await Company.findOne();
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      res.status(200).json(company);
    } catch (error) {
      console.error('❌ Error fetching company finance:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  