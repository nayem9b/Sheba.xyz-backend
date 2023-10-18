"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/auth/signup", user_controller_1.signUpUserController);
router.post("/auth/signin", user_controller_1.loginUser);
router.get("/users", user_controller_1.getAllUsersController);
router.delete("/users/:id", user_controller_1.deleteUserController);
router.patch("/users/:id", user_controller_1.updateUserController);
router.get("/users/:userId", user_controller_1.getSingleUserController);
router.get("/users/db/:userId", user_controller_1.getDBUserController);
exports.userRoutes = router;
