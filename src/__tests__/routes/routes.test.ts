import request from 'supertest';
import app from '../../app';

describe('API Routes Registration', () => {
  const routesToTest = [
    // User routes
    { method: 'GET', path: '/api/v1/users' },
    // Service routes
    { method: 'GET', path: '/api/v1/services' },
    // Category routes
    { method: 'GET', path: '/api/v1/categories' },
    // Rating routes
    { method: 'GET', path: '/api/v1/ratings' },
    // Booking routes
    { method: 'GET', path: '/api/v1/bookings' },
    // Cart routes
    { method: 'GET', path: '/api/v1/mycart/test-user' },
    // Feedback routes
    { method: 'GET', path: '/api/v1/feedbacks' },
    // Content routes
    { method: 'GET', path: '/api/v1/contents' },
    // Payment routes
    { method: 'GET', path: '/api/v1/payments' }
  ];

  describe('Route Registration Tests', () => {
    routesToTest.forEach(route => {
      it(`should have ${route.method} ${route.path} registered`, async () => {
        const method = route.method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'patch';
        const response = await request(app)[method](route.path);
        
        // We expect either a 200 OK, 401 Unauthorized, or 403 Forbidden
        // But not a 404 Not Found, which would indicate the route doesn't exist
        expect(response.status).not.toBe(404);
      });
    });
  });

  describe('Non-existent Route Test', () => {
    it('should return 404 for non-existent route', async () => {
      const response = await request(app).get('/api/v1/non-existent-route');
      expect(response.status).toBe(404);
    });
  });
});
