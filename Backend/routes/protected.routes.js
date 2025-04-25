const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/profile', verifyToken, (req, res) => {
  // Sample response with authenticated user data
  res.json({
    message: 'Profile data fetched successfully',
    user: {
      email: req.user.email,
      role: req.user.role
    }
  });
});

module.exports = router;
