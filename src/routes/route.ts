import express from "express";
import { userRoutes } from "../module/user/user.route";
import { shebaServices } from "../module/services/services.route";
import { categoryRoutes } from "../module/category/category.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
