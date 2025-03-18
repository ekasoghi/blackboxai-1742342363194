// Simulated user database (replace with real database in production)
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // In production, this would be hashed
    role: 'admin'
  }
];

// Login handler
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find user (in production, this would query a database)
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // In production, generate a JWT token here
    const mockToken = 'mock-jwt-token';

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token: mockToken,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// Logout handler
exports.logout = async (req, res) => {
  try {
    // In production, invalidate JWT token here
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message
    });
  }
};

// Token verification
exports.verifyToken = async (req, res) => {
  try {
    // In production, verify JWT token here
    const mockToken = req.headers.authorization;

    if (!mockToken) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    res.json({
      success: true,
      message: 'Token is valid'
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
};

// Forgot password handler
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // In production, send password reset email here

    res.json({
      success: true,
      message: 'Password reset instructions sent to email'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process forgot password request',
      error: error.message
    });
  }
};

// Reset password handler
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      });
    }

    // In production, verify reset token and update password in database

    res.json({
      success: true,
      message: 'Password successfully reset'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to reset password',
      error: error.message
    });
  }
};
