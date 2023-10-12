import express from "express";
import { postRating, getAllReviewController } from "./rating.controller";
const router = express.Router();

router.post("/review", postRating);
router.get("/reviews", getAllReviewController);

export const ratingRoutes = router;
