"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../module/user/user.route");
const services_route_1 = require("../module/services/services.route");
const category_route_1 = require("../module/category/category.route");
const rating_route_1 = require("../module/rating/rating.route");
const booking_route_1 = require("../module/booking/booking.route");
const myCart_route_1 = require("../module/myCart/myCart.route");
const feedback_route_1 = require("../module/feedback/feedback.route");
const content_route_1 = require("../module/content/content.route");
const payment_routes_1 = require("../module/payment/payment.routes");
const metrics_utils_1 = require("../metrics/metrics_utils");
// const promClient = require('prom-client');
const router = express_1.default.Router();
router.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        const { method, originalUrl } = req;
        const statusCode = res.statusCode;
        metrics_utils_1.httpRequestCounter.labels({ method, path: originalUrl, status_code: statusCode }).inc();
        metrics_utils_1.requestDurationHistogram.labels({ method, path: originalUrl, status_code: statusCode }).observe(duration);
        metrics_utils_1.requestDurationSummary.labels({ method, path: originalUrl, status_code: statusCode }).observe(duration);
    });
    next();
});
const moduleRoutes = [
    {
        path: "/",
        route: user_route_1.userRoutes,
    },
    {
        path: "/",
        route: services_route_1.shebaServices,
    },
    {
        path: "/",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/",
        route: rating_route_1.ratingRoutes,
    },
    {
        path: "/",
        route: booking_route_1.bookingRoutes,
    },
    {
        path: "/",
        route: myCart_route_1.cartServices,
    },
    {
        path: "/",
        route: feedback_route_1.feedbackRoutes,
    },
    {
        path: "/",
        route: content_route_1.contentRoutes,
    },
    {
        path: "/",
        route: payment_routes_1.paymentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
