"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartServices = void 0;
const express_1 = __importDefault(require("express"));
const myCart_controller_1 = require("./myCart.controller");
const router = express_1.default.Router();
router.post("/add-to-cart", myCart_controller_1.addTOCartController);
router.get("/mycart/:userId", myCart_controller_1.getMyCartByUserIdController);
router.delete("/mycart/:id", myCart_controller_1.deleteMyCartController);
// router.get("/clerk-test", clerkTestController);
exports.cartServices = router;
