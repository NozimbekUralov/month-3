const sha256 = require('sha256')
const { USERS, MSGS } = require("../lib/config");
const { idProvider } = require("../lib/utils");

class UserModel {
    constructor({ username, password, avatar }) {
        this.id = idProvider(USERS);
        this.username = username;
        this.password = sha256(password);
        this.avatar = avatar;
    }
}

class MessagesModel {
    constructor({ text, fromId, toId }) {
        this.id = idProvider(MSGS);
        this.text = text;
        this.fromId = fromId;
        this.toId = toId;
    }
}

module.exports = {
    UserModel,
    MessagesModel
}