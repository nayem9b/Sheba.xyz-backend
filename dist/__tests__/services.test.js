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
const helpers_1 = require("./helpers");
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
describe('Services API', () => {
    // Clean up the database before each test
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.services.deleteMany({});
        yield prisma.category.deleteMany({});
    }));
    describe('POST /api/v1/services', () => {
        let categoryId;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            // Create a test category first
            const mockCategory = (0, helpers_1.generateMockCategoryData)();
            const category = yield prisma.category.create({
                data: mockCategory
            });
            categoryId = category.id;
        }));
        it('should create a new service', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockService = Object.assign(Object.assign({}, (0, helpers_1.generateMockServiceData)()), { categoryId });
            const response = yield (0, helpers_1.apiRequest)()
                .post('/api/v1/services')
                .send(mockService);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Service created successfully');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.name).toBe(mockService.name);
        }));
        it('should return error for invalid service data', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidService = {
                // Missing required fields
                name: 'Test Service'
            };
            const response = yield (0, helpers_1.apiRequest)()
                .post('/api/v1/services')
                .send(invalidService);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        }));
    });
    describe('GET /api/v1/services', () => {
        let categoryId;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            // Create a test category first
            const mockCategory = (0, helpers_1.generateMockCategoryData)();
            const category = yield prisma.category.create({
                data: mockCategory
            });
            categoryId = category.id;
        }));
        it('should return all services', () => __awaiter(void 0, void 0, void 0, function* () {
            // First create a service
            const mockService = Object.assign(Object.assign({}, (0, helpers_1.generateMockServiceData)()), { categoryId });
            yield prisma.services.create({
                data: mockService
            });
            const response = yield (0, helpers_1.apiRequest)()
                .get('/api/v1/services');
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Services fetched successfully');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        }));
        it('should filter services by category', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockService = Object.assign(Object.assign({}, (0, helpers_1.generateMockServiceData)()), { categoryId });
            yield prisma.services.create({
                data: mockService
            });
            const response = yield (0, helpers_1.apiRequest)()
                .get('/api/v1/services')
                .query({ categoryId });
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body.data.every((service) => service.categoryId === categoryId)).toBe(true);
        }));
    });
    // Clean up after all tests
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.services.deleteMany({});
        yield prisma.category.deleteMany({});
        yield prisma.$disconnect();
    }));
});
