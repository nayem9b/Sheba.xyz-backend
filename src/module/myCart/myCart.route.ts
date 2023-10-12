import express from "express";
import {
  addTOCartController,
  getMyCartByUserIdController,
} from "./myCart.controller";

const router = express.Router();
router.post("/add-to-cart", addTOCartController);
router.get("/mycart/:userId", getMyCartByUserIdController);

export const cartServices = router;
