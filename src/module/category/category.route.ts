import express from "express";
import {
  addCategoryController,
  getAllCategoryController,
} from "./category.controller";

const router = express.Router();

router.post("/categories", addCategoryController);
router.get("/categories", getAllCategoryController);

export const categoryRoutes = router;
