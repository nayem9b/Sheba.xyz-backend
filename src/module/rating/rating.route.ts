import express from "express";
import {
  postRating,
  getAllReviewController,
  getReviewByServiceIdController,
} from "./rating.controller";
const router = express.Router();

router.post("/review", postRating);
router.get("/reviews", getAllReviewController);
router.get("/reviews/:id", getReviewByServiceIdController);

export const ratingRoutes = router;
