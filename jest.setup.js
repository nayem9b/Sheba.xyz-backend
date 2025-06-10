// This file runs before each test
require('dotenv').config({ path: '.env.test' });

// Reset timeout for tests
jest.setTimeout(30000);

// Set test environment
process.env.NODE_ENV = 'test';

// Clean up after tests
afterAll(async () => {
  // Add any cleanup code here if needed
});
