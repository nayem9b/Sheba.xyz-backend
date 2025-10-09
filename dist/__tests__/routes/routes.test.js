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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
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
            it(`should have ${route.method} ${route.path} registered`, () => __awaiter(void 0, void 0, void 0, function* () {
                const method = route.method.toLowerCase();
                const response = yield (0, supertest_1.default)(app_1.default)[method](route.path);
                // We expect either a 200 OK, 401 Unauthorized, or 403 Forbidden
                // But not a 404 Not Found, which would indicate the route doesn't exist
                expect(response.status).not.toBe(404);
            }));
        });
    });
    describe('Non-existent Route Test', () => {
        it('should return 404 for non-existent route', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get('/api/v1/non-existent-route');
            expect(response.status).toBe(404);
        }));
    });
});
