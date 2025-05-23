import { Router } from "express";
import authController from "../controllers/auth.controller.js";

export const customerRouter = Router();

customerRouter.post("/auth/register", authController.REGISTER);
customerRouter.post("/auth/login", authController.LOGIN);