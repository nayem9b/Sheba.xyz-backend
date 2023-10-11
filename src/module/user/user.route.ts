import express from "express";
import {
  signUpUserController,
  getAllUsersController,
  loginUser,
} from "./user.controller";

const router = express.Router();

router.post("/auth/signup", signUpUserController);
router.post("/auth/signin", loginUser);
router.get("/users", getAllUsersController);
export const userRoutes = router;
