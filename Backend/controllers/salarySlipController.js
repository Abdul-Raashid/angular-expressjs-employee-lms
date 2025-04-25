const SalarySlip = require('../models/SalarySlip');

// Get all salary slips
exports.getAllSlips = async (req, res) => {
    try {
      const slips = await SalarySlip.find()
        .populate({
          path: 'employeeId',
          select: 'name' // Only include 'name'
        })
        .select('trainerCost generatedDate _id') // Select fields from SalarySlip
        .lean(); // Convert the result into plain JavaScript objects
  
      // Restructure the data to place 'name' at the top level
      const formattedSlips = slips.map(slip => {
        return {
          _id: slip._id,
          name: slip.employeeId.name, // Move the 'name' to the top level
          trainerCost: slip.trainerCost,
          generatedDate: slip.generatedDate
        };
      });
  
      // Return the formatted data
      res.json(formattedSlips);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
// Get slips for a specific employee
exports.getSlipsByEmployee = async (req, res) => {
  try {
    const slips = await SalarySlip.find({ employeeId: req.params.employeeId })
      .populate({
        path: 'employeeId',
        select: 'name' // Only include 'name'
      })
      .select('trainerCost generatedDate _id') // Select fields from SalarySlip
      .lean(); // Convert the result into plain JavaScript objects

    // Restructure the data to place 'name' at the top level
    const formattedSlips = slips.map(slip => {
      return {
        _id: slip._id,
        name: slip.employeeId.name, // Move the 'name' to the top level
        trainerCost: slip.trainerCost,
        generatedDate: slip.generatedDate
      };
    });

    // Return the formatted data
    res.json(formattedSlips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific slip by employee and month
exports.getSlipByEmployeeAndMonth = async (req, res) => {
  try {
    const { employeeId, month } = req.params;
    const slip = await SalarySlip.findOne({ employeeId, month });
    if (!slip) return res.status(404).json({ message: 'Salary slip not found' });
    res.json(slip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
