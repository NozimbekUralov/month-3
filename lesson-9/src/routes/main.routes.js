import { Router } from "express";
import { flowerRouter } from "./flowers.routes.js";
import { categoryRouter } from "./category.routes.js";
import { customerRouter } from "./customer.routes.js";

export const mainRouter = Router();

mainRouter.use("/categories", categoryRouter);
mainRouter.use("/flowers", flowerRouter);
mainRouter.use("/customer", customerRouter);

