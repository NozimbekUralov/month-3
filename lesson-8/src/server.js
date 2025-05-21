const express = require('express');
const app = express();
const { PORT } = require('./lib/config');
const appRouter = require('./routes/index');
const db = require('./lib/db');
const { brands, cars, roles, users, book_orders } = require('./models/index');

app.use(express.json());

app.use("/api", appRouter());

app.listen(PORT, async () => {
    try {
        await db.init([{ brands }, { cars }, { roles }, { users }, { book_orders }])
        console.log('db connected')
        console.log(`server is running on http://localhost:${PORT}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
});