const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { PORT } = require('./lib/config');
const appRouter = require('./routes/index');
const db = require('./lib/db');
const { brands, cars, roles, users, book_orders } = require('./models/index');
const swaggerDocument = require('./swagger')

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", appRouter());

app.listen(PORT, async () => {
    try {
        await db.init([{ brands }, { cars }, { roles }, { users }, { book_orders }])
        console.log('db connected')
        console.log(`server is running on http://localhost:${PORT}`);
        console.log(`swagger is running on http://localhost:${PORT}/api-docs`)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
});