import express from "express";
import { loginUser } from "../user/user.controller";
import { postService } from "./services.controller";
const router = express.Router();
router.post("/create-service", postService);
export const shebaServices = router;
