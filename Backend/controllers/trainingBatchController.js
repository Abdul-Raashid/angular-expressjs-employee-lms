const TrainingBatch = require('../models/TrainingBatch');

exports.getUpcomingBatches = async (req, res) => {
  try {
    const today = new Date();
    const batches = await TrainingBatch.find({ startDate: { $gt: today } }).sort({ startDate: 1 });
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming batches', error: error.message });
  }
};

exports.getOngoingBatches = async (req, res) => {
  try {
    const today = new Date();
    const batches = await TrainingBatch.find({
      startDate: { $lte: today },
      endDate: { $gte: today }
    }).sort({ startDate: 1 });
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ongoing batches', error: error.message });
  }
};

exports.getCompletedBatches = async (req, res) => {
  try {
    const today = new Date();
    const batches = await TrainingBatch.find({ endDate: { $lt: today } }).sort({ endDate: -1 });
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching completed batches', error: error.message });
  }
};
