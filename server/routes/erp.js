const express = require('express');
const router = express.Router();
const erpController = require('../controllers/erpController');

// Dashboard routes
router.get('/dashboard', erpController.getDashboard);

// Inventory routes
router.get('/inventory', erpController.getInventory);

// Orders routes
router.get('/orders', erpController.getOrders);

// HR routes
router.get('/hr', erpController.getHR);

// Analytics routes
router.get('/analytics', erpController.getAnalytics);

// Reports routes
router.get('/reports', erpController.getReports);

// Settings routes
router.get('/settings', erpController.getSettings);

// Error handling middleware specific to ERP routes
router.use((err, req, res, next) => {
  console.error('ERP Route Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'ERP Module Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = router;
