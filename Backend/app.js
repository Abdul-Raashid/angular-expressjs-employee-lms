const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const bcrypt = require('bcrypt');

const User = require('./models/user.model');
const Employee = require('./models/Employee');
const Company = require('./models/Company');
const { autoPaySalaries } = require('./controllers/salaryController');
const trainingBatchRoutes = require('./routes/trainingBatch');
const employeeInvoiceRoutes = require('./routes/employeeInvoiceRoutes');



dotenv.config();
connectDB();

const app = express();
const corsOptions = {
  origin: 'http://localhost:4200', // frontend URL
  credentials: true,               // allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
const salarySlipRoutes = require('./routes/salarySlipRoutes');
app.use('/api/salary-slips', salarySlipRoutes);

app.use('/api/batches', trainingBatchRoutes);
app.use('/api/employee-invoices', employeeInvoiceRoutes);
const authRoutes = require('./routes/auth.routes');
const protectedRoutes = require('./routes/protected.routes');
const financeRoutes = require('./routes/finance');
const purchaseOrderRoutes = require('./routes/purchaseOrders');
const invoiceRoutes = require('./routes/invoices');
const dashboardRoutes = require('./routes/dashboard');
const employeeRoutes = require('./routes/employees');
const salaryRoutes = require('./routes/salaries');

// Mount routes
app.use('/auth', authRoutes);
app.use('/auth', protectedRoutes); // Merges protected routes under /auth
app.use('/api/finance', financeRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api', dashboardRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🌐 Flexible Cloud Services API is running');
});

// Auto-trigger salary payment
console.log('Salary payment automatically triggered');
autoPaySalaries();

// --- Default Data Setup Functions ---

async function addDefaultAdmin() {
  try {
    const email = 'shaikabdulraashid@gmail.com';
    const plainPassword = '1234';

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const admin = new User({ email, password: hashedPassword, role: 'admin' });
    await admin.save();
    console.log('✅ Default admin created.');
  } catch (err) {
    console.error('Error creating default admin:', err);
  }
}

async function addDefaultEmployee() {
  try {
    const existing = await Employee.findOne({ name: 'Sarath' });
    if (!existing) {
      const sarath = new Employee({
        name: 'Sarath',
        role: 'Trainer',
        salary: 50000,
        paid: 'yes',
        trainerBankDetails: {
          accountHolder: 'Sarath',
          accountNumber: '1234567890',
          bankName: 'HDFC Bank',
          ifscCode: 'HDFC0001234',
        },
      });
      await sarath.save();
      console.log('✅ Default employee Sarath added.');
    } else {
      console.log('Employee Sarath already exists.');
    }
  } catch (err) {
    console.error('Error adding default employee:', err);
  }
}

async function addDefaultCompany() {
  try {
    const existing = await Company.findOne({ name: 'Flexible Cloud Services' });
    if (!existing) {
      const company = new Company({
        name: 'Flexible Cloud Services',
        address: 'Hyderabad, India',
        email: 'info@flexiblecloud.com',
        phone: '9876543210',
        bankDetails: {
          accountHolder: 'Flexible Cloud Services',
          accountNumber: '1234567890',
          bankName: 'Axis Bank',
          ifscCode: 'UTIB0001234',
        },
        financeSummary: {
          currentBudget: 1000000,
        },
      });
      await company.save();
      console.log('✅ Default company added.');
    } else {
      console.log('Company Flexible Cloud Services already exists.');
    }
  } catch (err) {
    console.error('Error adding default company:', err);
  }
}

// Initialize default data
(async () => {
  await addDefaultAdmin();
  await addDefaultEmployee();
  await addDefaultCompany();
})();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
