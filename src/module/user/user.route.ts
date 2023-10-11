import express from "express";
import { signUpUserController } from "./user.controller";

const router = express.Router();

router.post("/auth/signup", signUpUserController);

export const userRoutes = router;
