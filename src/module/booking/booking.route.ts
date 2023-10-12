import express from "express";
import { addBookingController } from "./booking.controller";
const router = express.Router();

router.post("/book", addBookingController);

export const bookingRoutes = router;
