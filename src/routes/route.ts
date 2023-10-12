import express from "express";
import { userRoutes } from "../module/user/user.route";
import { shebaServices } from "../module/services/services.route";
import { categoryRoutes } from "../module/category/category.route";
import { ratingRoutes } from "../module/rating/rating.route";
import { bookingRoutes } from "../module/booking/booking.route";
import { cartServices } from "../module/myCart/myCart.route";
import { feedbackRoutes } from "../module/feedback/feedback.route";

const router = express.Router();

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
