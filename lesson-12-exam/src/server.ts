// src/server.ts
import fs from 'node:fs'
import express from 'express'
import { apiRouter, bootstrap, gracefulShutdown } from "./api/app";
import { serverConfig } from "./utils/config";
import swaggerUI from 'swagger-ui-express';

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(JSON.parse(fs.readFileSync(__dirname + '/swagger.json', 'utf8'))))
app.use('/api', apiRouter);

app.listen(serverConfig.PORT, async () => {
    await bootstrap()
    console.log(`server listening at http://localhost:${serverConfig.PORT}`);
});

const shutdown = async () => {
    console.log("Shutting down gracefully...");
    await gracefulShutdown();
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);