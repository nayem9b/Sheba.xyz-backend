import express from "express";
import { userRoutes } from "../module/user/user.route";
import { shebaServices } from "../module/services/services.route";
import { categoryRoutes } from "../module/category/category.route";
import { ratingRoutes } from "../module/rating/rating.route";
import { bookingRoutes } from "../module/booking/booking.route";
import { cartServices } from "../module/myCart/myCart.route";
import { feedbackRoutes } from "../module/feedback/feedback.route";
import { contentRoutes } from "../module/content/content.route";
import { paymentRoutes } from "../module/payment/payment.routes";
import { httpRequestCounter, requestDurationHistogram, requestDurationSummary } from "../metrics/metrics_utils";

// const promClient = require('prom-client');
const router = express.Router();




router.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const { method, originalUrl } = req;
    const statusCode = res.statusCode;
    httpRequestCounter.labels({ method, path: originalUrl, status_code: statusCode }).inc();
    requestDurationHistogram.labels({ method, path: originalUrl, status_code: statusCode }).observe(duration);
    requestDurationSummary.labels({ method, path: originalUrl, status_code: statusCode }).observe(duration);
  });
  next();
});

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: shebaServices,
  },
  {
    path: "/",
    route: categoryRoutes,
  },
  {
    path: "/",
    route: ratingRoutes,
  },
  {
    path: "/",
    route: bookingRoutes,
  },
  {
    path: "/",
    route: cartServices,
  },
  {
    path: "/",
    route: feedbackRoutes,
  },
  {
    path: "/",
    route: contentRoutes,
  },
  {
    path: "/",
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
