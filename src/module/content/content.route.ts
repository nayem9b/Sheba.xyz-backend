import express from "express";
import { addFeedbackController } from "../feedback/feedback.controller";
import {
  addContentController,
  getAllContentsController,
} from "./content.controller";
const router = express.Router();

router.post("/content", addContentController);
router.get("/contents", getAllContentsController);
export const contentRoutes = router;
