// This file runs before each test
require('dotenv').config({ path: '.env.test' });

// Reset timeout for tests
global.jest.setTimeout(30000);

// Set test environment
process.env.NODE_ENV = 'test';

// Clean up after tests
global.afterAll(async () => {
  // Add any cleanup code here if needed
});
