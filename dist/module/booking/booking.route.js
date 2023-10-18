"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post("/book", booking_controller_1.addBookingController);
router.get("/bookings", booking_controller_1.getAllBookingController);
router.get("/bookings/:id", booking_controller_1.getSingleBookingController);
router.patch("/bookings/:id", booking_controller_1.updateBookingController);
router.get("/mybooking/:userId", booking_controller_1.getBookingByUserIdController);
router.delete("/mybooking/:userId", booking_controller_1.deleteBookingController);
exports.bookingRoutes = router;
