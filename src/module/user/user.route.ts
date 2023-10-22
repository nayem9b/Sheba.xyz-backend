import express from "express";
import {
  signUpUserController,
  getAllUsersController,
  loginUser,
  getSingleUserController,
  deleteUserController,
  getDBUserController,
  updateUserController,
} from "./user.controller";

const router = express.Router();

router.post("/auth/signup", signUpUserController);
router.post("/auth/signin", loginUser);
router.get("/users", getAllUsersController);
router.delete("/users/:id", deleteUserController);
router.patch("/users/:id", updateUserController);
router.get("/users/:userId", getSingleUserController);
router.get("/users/db/:userId", getDBUserController);
export const userRoutes = router;
