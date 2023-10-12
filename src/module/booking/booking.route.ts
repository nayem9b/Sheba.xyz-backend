import express from "express";
import {
  addBookingController,
  getBookingByUserIdController,
  deleteBookingController,
  getAllBookingController,
  updateBookingController,
} from "./booking.controller";

const router = express.Router();

router.post("/book", addBookingController);
router.get("/bookings", getAllBookingController);
router.patch("/bookings/:id", updateBookingController);
router.get("/mybooking/:userId", getBookingByUserIdController);
router.delete("/mybooking/:userId", deleteBookingController);

export const bookingRoutes = router;
