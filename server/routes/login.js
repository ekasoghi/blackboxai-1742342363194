const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Authentication routes
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.get('/verify', loginController.verifyToken);

// Password management
router.post('/forgot-password', loginController.forgotPassword);
router.post('/reset-password', loginController.resetPassword);

// Error handling middleware specific to authentication
router.use((err, req, res, next) => {
  console.error('Authentication Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Authentication Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = router;
