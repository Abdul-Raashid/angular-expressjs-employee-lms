const mongoose = require('mongoose');

const trainingBatchSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  trainerName: { type: String, required: true },
  batchNumber: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('TrainingBatch', trainingBatchSchema);
