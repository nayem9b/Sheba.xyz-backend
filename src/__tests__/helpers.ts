
import request from 'supertest';
import app from '../app';

export const testApp = app;

export const apiRequest = () => {
  return request(testApp);
};

import { Location, ServiceStatus } from '@prisma/client';

export const generateMockServiceData = () => {
  return {
    name: 'Test Service',
    price: 100,
    details: 'Test service description',
    image: 'test-image.jpg',
    categoryId: 'test-category-id',
    rating: '4.5',
    location: Location.Dhaka,
    status: ServiceStatus.available
  };
};

export const generateMockUserData = () => {
  return {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpass123',
    role: 'user'
  };
};

export const generateMockCategoryData = () => {
  return {
    title: 'Test Category',
    image: 'test-category-image.jpg'
  };
};
