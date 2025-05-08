const path = require('path');

const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const { PORT } = require('./lib/config')
const viewsRouter = require('./routes/views');
const mainRouter = require('./routes/index');
const { verifyToken } = require('./lib/utils');
const ee = require('./lib/events');

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/src/views');

app.use('/api', mainRouter);
app.use(viewsRouter);

app.use(express.static(path.join(process.cwd(), 'public')));

const server = createServer(app);
const io = new Server(server);

const onlineUsers = new Map();

const checkAuth = (socket) => {
    const token = socket.handshake.auth.token.split(' ')[1]
    if (token) {
        try {
            const user = verifyToken(token);
            if (user) return user;
        } catch (err) {
            console.log(err);
        }
    }
}

io.on('connection', (socket) => {
    const user = checkAuth(socket);
    if (user) onlineUsers.set(user.id, socket.id);

    io.emit('userConnection', user.id);
    io.emit('onlineUsers', Array.from(onlineUsers.keys()));

    socket.on('disconnect', (data) => {
        const user = checkAuth(socket);
        if (user) onlineUsers.delete(user.id);
    })
})

ee.on('newMessage', (msg) => {
    io.to(onlineUsers.get(msg.toId)).emit('message', msg);
})

server.listen(PORT,
    () => console.log(`Server is running on http://localhost:${PORT}`)
);
