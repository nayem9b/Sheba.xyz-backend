import { apiRequest, generateMockServiceData, generateMockCategoryData } from './helpers';
import httpStatus from 'http-status';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Services API', () => {
  // Clean up the database before each test
  beforeEach(async () => {
    await prisma.services.deleteMany({});
    await prisma.category.deleteMany({});
  });

  describe('POST /api/v1/services', () => {
    let categoryId: string;

    beforeEach(async () => {
      // Create a test category first
      const mockCategory = generateMockCategoryData();
      const category = await prisma.category.create({
        data: mockCategory
      });
      categoryId = category.id;
    });

    it('should create a new service', async () => {
      const mockService = {
        ...generateMockServiceData(),
        categoryId
      };
      
      const response = await apiRequest()
        .post('/api/v1/services')
        .send(mockService);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Service created successfully');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe(mockService.name);
    });

    it('should return error for invalid service data', async () => {
      const invalidService = {
        // Missing required fields
        name: 'Test Service'
      };

      const response = await apiRequest()
        .post('/api/v1/services')
        .send(invalidService);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /api/v1/services', () => {
    let categoryId: string;

    beforeEach(async () => {
      // Create a test category first
      const mockCategory = generateMockCategoryData();
      const category = await prisma.category.create({
        data: mockCategory
      });
      categoryId = category.id;
    });

    it('should return all services', async () => {
      // First create a service
      const mockService = {
        ...generateMockServiceData(),
        categoryId
      };
      await prisma.services.create({
        data: mockService
      });

      const response = await apiRequest()
        .get('/api/v1/services');

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Services fetched successfully');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should filter services by category', async () => {
      const mockService = {
        ...generateMockServiceData(),
        categoryId
      };
      await prisma.services.create({
        data: mockService
      });

      const response = await apiRequest()
        .get('/api/v1/services')
        .query({ categoryId });

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body.data.every((service: any) => 
        service.categoryId === categoryId
      )).toBe(true);
    });
  });

  // Clean up after all tests
  afterAll(async () => {
    await prisma.services.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.$disconnect();
  });
});
