import express from "express";
import { loginUser } from "../user/user.controller";
import {
  postService,
  getAllServiceController,
  getServiceByCategoryIdController,
} from "./services.controller";
const router = express.Router();
router.post("/create-service", postService);
router.get("/services", getAllServiceController);
router.get("/services/:categoryId", getServiceByCategoryIdController);
export const shebaServices = router;
