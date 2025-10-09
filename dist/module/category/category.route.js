"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post("/categories", category_controller_1.addCategoryController);
router.post("/categoryphoto", category_controller_1.addCategoryController);
router.get("/categories", category_controller_1.getAllCategoryController);
router.get("/category/:id", category_controller_1.getAllCategoryController);
exports.categoryRoutes = router;
