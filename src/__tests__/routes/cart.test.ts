
/* global describe, it, beforeEach, expect */
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../../app';

const prisma = new PrismaClient();

describe('Cart Routes', () => {
  // Clear test data before each test
  beforeEach(async () => {
    await prisma.myCart.deleteMany();
    await prisma.services.deleteMany();
    await prisma.category.deleteMany();
  });

  describe('POST /api/v1/add-to-cart', () => {
    it('should add an item to cart', async () => {
      // First create a test category and service
      const category = await prisma.category.create({
        data: {
          title: 'Test Category',
          image: 'test.jpg'
        }
      });

      const service = await prisma.services.create({
        data: {
          name: 'Test Service',
          price: 100,
          details: 'Test Details',
          image: 'test.jpg',
          categoryId: category.id,
          rating: '4.5',
          location: 'Dhaka',
          status: 'available'
        }
      });

      const cartData = {
        userId: 'test-user-id',
        servicesId: service.id
      };

      const response = await request(app)
        .post('/api/v1/add-to-cart')
        .send(cartData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.userId).toBe(cartData.userId);
      expect(response.body.data.servicesId).toBe(cartData.servicesId);
    });
  });

  describe('GET /api/v1/mycart/:userId', () => {
    it('should get cart items for a user', async () => {
      // Create test data
      const category = await prisma.category.create({
        data: {
          title: 'Test Category',
          image: 'test.jpg'
        }
      });

      const service = await prisma.services.create({
        data: {
          name: 'Test Service',
          price: 100,
          details: 'Test Details',
          image: 'test.jpg',
          categoryId: category.id,
          rating: '4.5',
          location: 'Dhaka',
          status: 'available'
        }
      });

      const userId = 'test-user-id';
      await prisma.myCart.create({
        data: {
          userId,
          servicesId: service.id
        }
      });

      const response = await request(app)
        .get(`/api/v1/mycart/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data[0].userId).toBe(userId);
    });
  });

  describe('DELETE /api/v1/mycart/:id', () => {
    it('should delete a cart item', async () => {
      // Create test data
      const category = await prisma.category.create({
        data: {
          title: 'Test Category',
          image: 'test.jpg'
        }
      });

      const service = await prisma.services.create({
        data: {
          name: 'Test Service',
          price: 100,
          details: 'Test Details',
          image: 'test.jpg',
          categoryId: category.id,
          rating: '4.5',
          location: 'Dhaka',
          status: 'available'
        }
      });

      const cartItem = await prisma.myCart.create({
        data: {
          userId: 'test-user-id',
          servicesId: service.id
        }
      });

      const response = await request(app)
        .delete(`/api/v1/mycart/${cartItem.id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  // Clean up after all tests
  afterAll(async () => {
    await prisma.myCart.deleteMany();
    await prisma.services.deleteMany();
    await prisma.category.deleteMany();
    await prisma.$disconnect();
  });
});
