import express from "express";
import {
  addFeedbackController,
  getAllFeedbackController,
} from "./feedback.controller";

const router = express.Router();

router.post("/my-feedback", addFeedbackController);
router.get("/all-feedbacks", getAllFeedbackController);

export const feedbackRoutes = router;
