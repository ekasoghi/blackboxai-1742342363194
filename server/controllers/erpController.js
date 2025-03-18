// ERP Controller - Handles business logic for ERP routes

// Dashboard data
exports.getDashboard = async (req, res) => {
  try {
    const dashboardData = {
      summary: {
        totalRevenue: '$150,000',
        totalOrders: 250,
        activeUsers: 45,
        pendingTasks: 12
      },
      recentOrders: [
        { id: 1, customer: 'Tech Corp', amount: '$5,000', status: 'Completed' },
        { id: 2, customer: 'Global Industries', amount: '$7,500', status: 'Pending' },
        { id: 3, customer: 'Local Business', amount: '$3,200', status: 'Processing' }
      ],
      alerts: [
        { type: 'warning', message: 'Low inventory for Product A' },
        { type: 'info', message: 'New order received' },
        { type: 'success', message: 'Monthly targets achieved' }
      ]
    };
    res.json({ success: true, data: dashboardData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Inventory data
exports.getInventory = async (req, res) => {
  try {
    const inventoryData = {
      items: [
        { id: 1, name: 'Product A', quantity: 150, status: 'In Stock', price: '$100' },
        { id: 2, name: 'Product B', quantity: 50, status: 'Low Stock', price: '$200' },
        { id: 3, name: 'Product C', quantity: 0, status: 'Out of Stock', price: '$150' },
        { id: 4, name: 'Product D', quantity: 300, status: 'In Stock', price: '$75' }
      ],
      categories: [
        { name: 'Electronics', count: 50 },
        { name: 'Furniture', count: 30 },
        { name: 'Office Supplies', count: 100 }
      ]
    };
    res.json({ success: true, data: inventoryData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Orders data
exports.getOrders = async (req, res) => {
  try {
    const ordersData = {
      recent: [
        { id: 'ORD001', customer: 'John Doe', total: '$1,200', status: 'Delivered' },
        { id: 'ORD002', customer: 'Jane Smith', total: '$800', status: 'Processing' },
        { id: 'ORD003', customer: 'Bob Johnson', total: '$2,500', status: 'Pending' }
      ],
      statistics: {
        totalOrders: 1250,
        pendingOrders: 50,
        completedOrders: 1200,
        averageOrderValue: '$1,500'
      }
    };
    res.json({ success: true, data: ordersData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// HR data
exports.getHR = async (req, res) => {
  try {
    const hrData = {
      employees: [
        { id: 1, name: 'Alice Brown', department: 'Sales', status: 'Active' },
        { id: 2, name: 'Charlie Davis', department: 'IT', status: 'Active' },
        { id: 3, name: 'Eva Wilson', department: 'HR', status: 'On Leave' }
      ],
      departments: [
        { name: 'Sales', employeeCount: 15 },
        { name: 'IT', employeeCount: 10 },
        { name: 'HR', employeeCount: 5 }
      ],
      attendance: {
        present: 25,
        absent: 3,
        onLeave: 2
      }
    };
    res.json({ success: true, data: hrData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Analytics data
exports.getAnalytics = async (req, res) => {
  try {
    const analyticsData = {
      sales: {
        daily: [100, 150, 200, 180, 120, 190, 210],
        monthly: [3000, 3500, 4000, 3800, 4200, 4500],
        yearly: [45000, 52000, 58000, 62000]
      },
      performance: {
        efficiency: 85,
        quality: 92,
        satisfaction: 88
      }
    };
    res.json({ success: true, data: analyticsData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Reports data
exports.getReports = async (req, res) => {
  try {
    const reportsData = {
      available: [
        { id: 1, name: 'Sales Report', type: 'Monthly', lastGenerated: '2023-12-01' },
        { id: 2, name: 'Inventory Status', type: 'Weekly', lastGenerated: '2023-12-07' },
        { id: 3, name: 'Employee Performance', type: 'Quarterly', lastGenerated: '2023-10-01' }
      ]
    };
    res.json({ success: true, data: reportsData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Settings data
exports.getSettings = async (req, res) => {
  try {
    const settingsData = {
      system: {
        timezone: 'UTC',
        dateFormat: 'YYYY-MM-DD',
        language: 'English'
      },
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    };
    res.json({ success: true, data: settingsData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
