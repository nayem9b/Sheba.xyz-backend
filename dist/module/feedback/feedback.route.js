"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("./feedback.controller");
const router = express_1.default.Router();
router.post("/my-feedback", feedback_controller_1.addFeedbackController);
router.get("/all-feedbacks", feedback_controller_1.getAllFeedbackController);
exports.feedbackRoutes = router;
