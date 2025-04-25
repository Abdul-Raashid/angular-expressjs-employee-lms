const Employee = require('../models/Employee');


exports.addEmployee = async (req, res) => {
    try {
      const { name, role, salary, trainerBankDetails } = req.body;
      
      // Log the request body to debug
      console.log('Received data:', req.body);
  
      // Check if the required fields are missing
      if (!trainerBankDetails || !trainerBankDetails.accountHolder || !trainerBankDetails.accountNumber || !trainerBankDetails.bankName || !trainerBankDetails.ifscCode) {
        return res.status(400).json({ message: 'Missing required trainer bank details' });
      }
  
      const employee = new Employee({ name, role, salary, trainerBankDetails });
      await employee.save();
  
      res.status(201).json({ message: 'Employee added', employee });
    } catch (error) {
      console.error('❌ Error adding employee:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('❌ Error fetching employees:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }










};
