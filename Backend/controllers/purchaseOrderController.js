// controllers/purchaseOrderController.js
const PurchaseOrder = require('../models/PurchaseOrder');

// Create purchase order
exports.createPurchaseOrder = async (req, res) => {
  try {
    const { courseName, companyName, trainerName, startDate, numberOfDays, dailyCost, trainerCost } = req.body;

    // Ensure trainerCost is part of the request body
    if (trainerCost == null) {
      return res.status(400).json({ message: 'Trainer cost is required' });
    }

    // Create new purchase order
    const purchaseOrder = new PurchaseOrder({
      courseName,
      companyName,
      trainerName,
      startDate,
      numberOfDays,
      dailyCost,
      trainerCost
    });

    // Save the purchase order
    await purchaseOrder.save();

    // Return the created purchase order
    res.status(201).json(purchaseOrder);
  } catch (error) {
    console.error('❌ Error creating purchase order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all purchase orders
exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Error fetching purchase orders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get purchase order by ID
exports.getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('trainer');
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }
    res.status(200).json(purchaseOrder);
  } catch (error) {
    console.error('❌ Error fetching purchase order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
