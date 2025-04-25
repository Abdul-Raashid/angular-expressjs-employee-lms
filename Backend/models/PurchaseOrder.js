const mongoose = require('mongoose');
require('./TrainingBatch'); // This registers the TrainingBatch schema with mongoose

// Purchase Order Schema
const purchaseOrderSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  trainerName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  dailyCost: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    default: 0
  },
  trainerCost: {
    type: Number
  }
}, { timestamps: true });

// Consolidated pre('save') hook
purchaseOrderSchema.pre('save', async function (next) {
  try {
    this.totalCost = this.numberOfDays * this.dailyCost;
    const trainerCost = this.trainerCost;

    // Find the employee (trainer) to update salary
    const Employee = mongoose.model('Employee');
    const employee = await Employee.findOne({ name: this.trainerName });

    console.log('Employee found:', employee); // Debugging log

    if (employee) {
      // Update employee salary by adding trainer cost
      employee.salary += trainerCost;
      await employee.save();
      console.log(`💰 Updated salary for ${employee.name}: ${employee.salary}`);

      // Generate salary slip for the employee
      const month = new Date(this.startDate).toLocaleString('default', { month: 'long', year: 'numeric' });
      const SalarySlip = mongoose.model('SalarySlip');

      // Debugging log before creating the salary slip
      console.log(`Creating salary slip for ${employee.name} - Month: ${month}, Trainer Cost: ${trainerCost}`);

      const salarySlip = await SalarySlip.create({
        employeeId: employee._id,
        employeeName: employee.name,
        trainerCost,
        month,
        bankDetails: employee.trainerBankDetails
      });

      console.log(`🧾 Salary slip generated for ${employee.name} - ${month}:`, salarySlip);
    } else {
      console.log(`Employee not found for trainerName: ${this.trainerName}`);
    }

    // Find and update the company financials
    const Company = mongoose.model('Company');
    const company = await Company.findOne();

    if (company) {
      company.financeSummary.cumulativeRevenue += this.totalCost;
      company.financeSummary.cumulativeCost += trainerCost;
      company.financeSummary.profit = company.financeSummary.cumulativeRevenue - company.financeSummary.cumulativeCost;
      await company.save();
      console.log('🏦 Company Financials Updated');
    }

    // Create the TrainingBatch if it doesn't exist
    const TrainingBatch = mongoose.model('TrainingBatch');
    const existingBatch = await TrainingBatch.findOne({
      courseName: this.courseName,
      trainerName: this.trainerName,
      startDate: this.startDate
    });

    if (!existingBatch) {
      const endDate = new Date(this.startDate);
      endDate.setDate(endDate.getDate() + this.numberOfDays);
      const batchNumber = `BATCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      await TrainingBatch.create({
        courseName: this.courseName,
        trainerName: this.trainerName,
        batchNumber,
        startDate: this.startDate,
        endDate
      });

      console.log(`📚 TrainingBatch created: ${batchNumber}`);
    }

    next(); // Call next() to continue with saving the Purchase Order
  } catch (error) {
    console.log('Error in pre-save hook:', error);
    next(error); // Proper error handling
  }
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrder;
