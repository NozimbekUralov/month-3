import { config } from "dotenv";

config();

export const serverConfig = {
    PORT: Number(process.env.PORT) || 3000,
    DB_HOST: process.env.DB_HOST || "http://localhost",
    DB_PORT: Number(process.env.DB_PORT) || 3306,
    DB_NAME: process.env.DB_NAME || "exam",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
}