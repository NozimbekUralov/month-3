// src/app.ts
import { Router, json } from "express";
import { RegisterRoutes } from "@/routes/routes";
import { DB } from "@/lib/mysql"

export const apiRouter = Router();

export async function bootstrap() {
    await DB.init()

    // Use body parser to read sent json payloads
    apiRouter.use(json());

    RegisterRoutes(apiRouter);
};

export async function gracefulShutdown() {
    await DB.destroy();
}