"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* global describe, it, beforeEach, expect */
const supertest_1 = __importDefault(require("supertest"));
const client_1 = require("@prisma/client");
const app_1 = __importDefault(require("../../app"));
const prisma = new client_1.PrismaClient();
describe('Cart Routes', () => {
    // Clear test data before each test
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.myCart.deleteMany();
        yield prisma.services.deleteMany();
        yield prisma.category.deleteMany();
    }));
    describe('POST /api/v1/add-to-cart', () => {
        it('should add an item to cart', () => __awaiter(void 0, void 0, void 0, function* () {
            // First create a test category and service
            const category = yield prisma.category.create({
                data: {
                    title: 'Test Category',
                    image: 'test.jpg'
                }
            });
            const service = yield prisma.services.create({
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
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/v1/add-to-cart')
                .send(cartData);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.userId).toBe(cartData.userId);
            expect(response.body.data.servicesId).toBe(cartData.servicesId);
        }));
    });
    describe('GET /api/v1/mycart/:userId', () => {
        it('should get cart items for a user', () => __awaiter(void 0, void 0, void 0, function* () {
            // Create test data
            const category = yield prisma.category.create({
                data: {
                    title: 'Test Category',
                    image: 'test.jpg'
                }
            });
            const service = yield prisma.services.create({
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
            yield prisma.myCart.create({
                data: {
                    userId,
                    servicesId: service.id
                }
            });
            const response = yield (0, supertest_1.default)(app_1.default)
                .get(`/api/v1/mycart/${userId}`);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data[0].userId).toBe(userId);
        }));
    });
    describe('DELETE /api/v1/mycart/:id', () => {
        it('should delete a cart item', () => __awaiter(void 0, void 0, void 0, function* () {
            // Create test data
            const category = yield prisma.category.create({
                data: {
                    title: 'Test Category',
                    image: 'test.jpg'
                }
            });
            const service = yield prisma.services.create({
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
            const cartItem = yield prisma.myCart.create({
                data: {
                    userId: 'test-user-id',
                    servicesId: service.id
                }
            });
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/api/v1/mycart/${cartItem.id}`);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        }));
    });
    // Clean up after all tests
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.myCart.deleteMany();
        yield prisma.services.deleteMany();
        yield prisma.category.deleteMany();
        yield prisma.$disconnect();
    }));
});
