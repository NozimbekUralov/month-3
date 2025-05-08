const ee = require("../lib/events");
const { MSGS } = require("../lib/config");
const { errorHandler, readDb, writeDb, responseHandler, ResponseObj } = require("../lib/utils");
const { MessagesModel } = require("../models");

class MessageController {
    async SEND(req, res) {
        try {
            const { id } = req.user;
            const { message } = req.body;
            const msg = new MessagesModel(message);
            msg.fromId = id;
            const store = await readDb(MSGS);
            await writeDb(MSGS, [...store, msg]);
            responseHandler(new ResponseObj('message sent', 201, { message: msg }), res)
            ee.emit('newMessage', msg);
        } catch (err) {
            errorHandler(err, res);
        }
    }

    async USER_MESSAGES(req, res) {
        try {
            const { id } = req.user;
            const { userId } = req.params;
            const store = await readDb(MSGS);
            const messages = store.filter(msg => msg.fromId == id && msg.toId == userId || msg.fromId == userId && msg.toId == id);
            responseHandler(new ResponseObj('messages', 200, { messages }), res)
        } catch (err) {
            errorHandler(err, res);
        }
    }
}

module.exports = new MessageController();