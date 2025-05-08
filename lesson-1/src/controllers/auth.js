const sha256 = require('sha256');

const { USERS } = require("../lib/config");
const { errorHandler, responseHandler, ResponseObj, readDb, writeDb, ClientError, generateToken } = require("../lib/utils");
const { UserModel } = require("../models");

class AuthController {
    async REGISTER(req, res) {
        try {
            const store = await readDb(USERS);
            const idx = store.findIndex(user => user.username == req.body.username);
            if (idx != -1) throw new ClientError('Username already exists', 400, null);
            const file = req.files.file;
            const avatar = Date.now() + '_' + file.name;
            file.mv(req.filePath + '/' + avatar);
            const user = new UserModel({ ...req.body, avatar });
            await writeDb(USERS, [...store, user]);
            responseHandler(new ResponseObj('User registered successfully', 201, null), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }

    async LOGIN(req, res) {
        try {
            const store = await readDb(USERS);
            const { username, password } = req.body;
            const idx = store.findIndex(user => user.username == username && user.password == sha256(password));
            if (idx == -1) throw new ClientError('Invalid username or password', 400, null);
            const user = store[idx];
            const token = generateToken({ id: user.id });
            responseHandler(new ResponseObj('User logged in successfully', 200, { token }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}

module.exports = new AuthController();