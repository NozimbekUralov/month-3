const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const { PORT } = require('./lib/config')
const viewsRouter = require('./routes/views');

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/src/views');

app.use(viewsRouter);

app.use(express.static(process.cwd() + 'public'));

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {

})

server.listen(PORT,
    () => console.log(`Server is running on http://localhost:${PORT}`)
);

