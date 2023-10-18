import express from "express";
import { addFeedbackController } from "../feedback/feedback.controller";
import {
  addContentController,
  deleteContentController,
  getAllContentsController,
} from "./content.controller";
const router = express.Router();

router.post("/content", addContentController);
router.get("/contents", getAllContentsController);
router.delete("/contents/:id", deleteContentController);
export const contentRoutes = router;
