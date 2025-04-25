const SalaryPayment = require('../models/SalaryPayment');
const Employee = require('../models/Employee');
const Company = require('../models/Company');

const PurchaseOrder = require('../models/PurchaseOrder');


// controllers/salaryController.js


exports.autoPaySalaries = async () => {
  console.log('Function is called!');
  try {
    // Fetch all employees who should be paid
    const employees = await Employee.find({ isActive: true });

    for (let employee of employees) {
      console.log(`➡️ Calculating salary for ${employee.name}`);

      // Fetch PurchaseOrders associated with the employee (based on trainerName)
      const purchaseOrders = await PurchaseOrder.find({ trainerName: employee.name });

      // Calculate total salary from PurchaseOrders (sum trainerCost)
      const totalTrainerCost = purchaseOrders.reduce((sum, order) => sum + (order.trainerCost || 0), 0);
      console.log(`💰 Total Salary for ${employee.name}:`, totalTrainerCost);

      // Create a SalaryPayment record for the employee
      const salaryPayment = new SalaryPayment({
        employeeId: employee._id,
        Name: employee.name,
        Salary: totalTrainerCost
      });
      await salaryPayment.save();
      console.log(`✅ Salary Payment Saved for ${employee.name}`);

      // Update company finances
      const company = await Company.findOne();
      if (company) {
        company.financeSummary.profit -= totalTrainerCost;
        company.financeSummary.currentBudget -= totalTrainerCost;
        await company.save();
        console.log('🏦 Company Financials Updated');
      }

      // Mark the employee as paid
      employee.paid = 'Yes';
      employee.paymentDate = new Date().toISOString().split('T')[0]; // format YYYY-MM-DD
      await employee.save();
      console.log(`🧾 Employee Payment Status Updated for ${employee.name}`);
    }

    console.log('✅ All Salaries Paid');
  } catch (error) {
    console.error('❌ Error in automatic salary payment:', error);
  }
};
















// Pay salary to an employee and update company profit
exports.paySalary = async (req, res) => {
  try {
    const { name } = req.body; // Pass only name in the request body

    // 1. Find employee by name
    const employee = await Employee.findOne({ name });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // 2. Calculate salary from total trainerCost in PurchaseOrders
    const purchaseOrders = await PurchaseOrder.find({ trainerName: name });
    const totalTrainerCost = purchaseOrders.reduce((sum, order) => sum + (order.trainerCost || 0), 0);

    // 3. Create SalaryPayment entry
    const salaryPayment = new SalaryPayment({
      employeeId: employee._id,
      Name: employee.name,
      Salary: totalTrainerCost
    });
    await salaryPayment.save();

    // 4. Update Company finances
    const company = await Company.findOne();
    if (company) {
      company.financeSummary.profit -= totalTrainerCost;
      company.financeSummary.currentBudget -= totalTrainerCost;
      await company.save();
    }

    // 5. Update Employee status
    employee.paid = 'Yes';
    employee.paymentDate = new Date().toISOString().split('T')[0]; // format YYYY-MM-DD
    await employee.save();

    res.status(201).json({ message: 'Salary paid successfully', salaryPayment });
  } catch (error) {
    console.error('❌ Error paying salary:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all salary payments
exports.getAllSalaryPayments = async (req, res) => {
    try {
      const salaryPayments = await SalaryPayment.find()
        .populate('employeeId', 'name salary') // populate only name and salary from Employee
        .select('status paymentDate employeeId'); // select fields from SalaryPayment
  
      // Map to desired response structure
      const result = salaryPayments.map(payment => ({
        name: payment.employeeId.name,
        salary: payment.employeeId.salary,
        status: payment.status || 'Paid',
        paymentDate: payment.paymentDate
      }));
  
      res.status(200).json(result);
    } catch (error) {
      console.error('❌ Error fetching salary payments:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  