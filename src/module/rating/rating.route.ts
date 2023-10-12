import express from "express";
import { postRating } from "./rating.controller";
const router = express.Router();

router.post("/review", postRating);

export const ratingRoutes = router;
