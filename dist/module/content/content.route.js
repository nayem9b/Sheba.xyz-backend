"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const content_controller_1 = require("./content.controller");
const router = express_1.default.Router();
router.post("/content", content_controller_1.addContentController);
router.get("/contents", content_controller_1.getAllContentsController);
router.delete("/contents/:id", content_controller_1.deleteContentController);
exports.contentRoutes = router;
