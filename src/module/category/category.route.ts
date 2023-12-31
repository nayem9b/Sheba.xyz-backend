import express from "express";
import {
  addCategoryController,
  getAllCategoryController,
} from "./category.controller";

const router = express.Router();

router.post("/categories", addCategoryController);
router.post("/categoryphoto", addCategoryController);
router.get("/categories", getAllCategoryController);
router.get("/category/:id", getAllCategoryController);

export const categoryRoutes = router;
