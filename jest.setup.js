// This file runs before each test
require('dotenv').config();

// Reset timeout for tests
jest.setTimeout(30000);

// Clean up after tests
afterAll(async () => {
  // Add any cleanup code here if needed
});
