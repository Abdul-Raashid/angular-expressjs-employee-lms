// controllers/dashboardController.js
const Company = require('../models/Company');
const Employee = require('../models/Employee');


exports.getDashboardData = async (req, res) => {
  try {
    const company = await Company.findOne();
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const totalSalaries = await Employee.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, totalSalaries: { $sum: "$salary" } } }
    ]);

    const dashboardData = {
      budget: company.financeSummary.currentBudget,
      totalRevenue: company.financeSummary.cumulativeRevenue,
      totalSalaries: totalSalaries[0]?.totalSalaries || 0,
      profit: company.financeSummary.profit
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
