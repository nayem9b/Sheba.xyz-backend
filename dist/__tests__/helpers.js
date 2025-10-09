"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMockCategoryData = exports.generateMockUserData = exports.generateMockServiceData = exports.apiRequest = exports.testApp = void 0;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
exports.testApp = app_1.default;
const apiRequest = () => {
    return (0, supertest_1.default)(exports.testApp);
};
exports.apiRequest = apiRequest;
const client_1 = require("@prisma/client");
const generateMockServiceData = () => {
    return {
        name: 'Test Service',
        price: 100,
        details: 'Test service description',
        image: 'test-image.jpg',
        categoryId: 'test-category-id',
        rating: '4.5',
        location: client_1.Location.Dhaka,
        status: client_1.ServiceStatus.available
    };
};
exports.generateMockServiceData = generateMockServiceData;
const generateMockUserData = () => {
    return {
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpass123',
        role: 'user'
    };
};
exports.generateMockUserData = generateMockUserData;
const generateMockCategoryData = () => {
    return {
        title: 'Test Category',
        image: 'test-category-image.jpg'
    };
};
exports.generateMockCategoryData = generateMockCategoryData;
