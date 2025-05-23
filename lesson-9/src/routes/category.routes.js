import { Router } from "express";
import categoryController from "../controllers/category.controller.js";

export const categoryRouter = Router();

categoryRouter.post("/add", categoryController.POST);
categoryRouter.delete("/delete/:deleteId", categoryController.DELETE);