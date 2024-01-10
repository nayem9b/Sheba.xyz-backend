import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/payment/init", PaymentController.initPayment);

export const paymentRoutes = router;
