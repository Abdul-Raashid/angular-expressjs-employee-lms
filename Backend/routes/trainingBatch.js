const express = require('express');
const router = express.Router();
const trainingBatchController = require('../controllers/trainingBatchController');

router.get('/upcoming', trainingBatchController.getUpcomingBatches);
router.get('/ongoing', trainingBatchController.getOngoingBatches);
router.get('/completed', trainingBatchController.getCompletedBatches);

module.exports = router;
