import express from "express";
import {
  signUpUserController,
  getAllUsersController,
  loginUser,
  getSingleUserController,
} from "./user.controller";

const router = express.Router();

router.post("/auth/signup", signUpUserController);
router.post("/auth/signin", loginUser);
router.get("/users", getAllUsersController);
router.get("/users/:userId", getSingleUserController);
export const userRoutes = router;
