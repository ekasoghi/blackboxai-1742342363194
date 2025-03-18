require('dotenv').config();

const config = {
  // Server Configuration
  port: process.env.PORT || 8000, // Using port 8000 as required
  env: process.env.NODE_ENV || 'development',

  // Database Configuration (for future implementation)
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'erp_db'
  },

  // Authentication Configuration
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiration: process.env.JWT_EXPIRATION || '24h'
  },

  // API Configuration
  api: {
    prefix: '/api'
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }
};

module.exports = config;
