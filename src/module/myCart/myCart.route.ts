import express from "express";
import {
  addTOCartController,
  getMyCartByUserIdController,
  // clerkTestController,
} from "./myCart.controller";

const router = express.Router();
router.post("/add-to-cart", addTOCartController);
router.get("/mycart/:userId", getMyCartByUserIdController);
// router.get("/clerk-test", clerkTestController);

export const cartServices = router;
