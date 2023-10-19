"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shebaServices = void 0;
const express_1 = __importDefault(require("express"));
const services_controller_1 = require("./services.controller");
const router = express_1.default.Router();
router.post("/create-service", services_controller_1.postService);
router.get("/services", services_controller_1.getAllServiceController);
router.get("/servicestatus/upcoming", services_controller_1.getUpcomingServiceController);
router.get("/servicestatus/available", services_controller_1.getAvailableServiceController);
router.get("/services", services_controller_1.getAllServiceController);
router.patch("/services/:id", services_controller_1.updateServiceController);
router.delete("/services/:id", services_controller_1.deleteServiceController);
router.get("/services/category/:categoryId", services_controller_1.getServiceByCategoryIdController);
router.get("/services/:id", services_controller_1.getSingleServiceController);
exports.shebaServices = router;
