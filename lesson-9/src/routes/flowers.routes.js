import { Router } from "express";
import flowersControllers from "../controllers/flowers.controllers.js";

export const flowerRouter = Router();

flowerRouter.post("/add", flowersControllers.POST);