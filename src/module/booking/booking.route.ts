import express from "express";
import {
  addBookingController,
  getBookingByUserIdController,
} from "./booking.controller";
const router = express.Router();

router.post("/book", addBookingController);
router.get("/mybooking/:userId", getBookingByUserIdController);

export const bookingRoutes = router;
