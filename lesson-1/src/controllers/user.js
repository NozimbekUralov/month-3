const { USERS } = require("../lib/config");
const { readDb, errorHandler, responseHandler, ResponseObj } = require("../lib/utils");

class UserController {
    async ALL(req, res) {
        try {
            const { id } = req.user;
            const store = await readDb(USERS);
            const users = store.filter(user => user.id != id);
            responseHandler(new ResponseObj("users", 200, { users }), res);
        } catch (err) {
            errorHandler(err, res);
        }

    }

    async GET_ME(req, res) {
        try {
            const { id } = req.user;
            const store = await readDb(USERS);
            const idx = store.findIndex(user => user.id == id);
            const user = store[idx];
            delete user.password;
            responseHandler(new ResponseObj("user", 200, { user }), res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}

module.exports = new UserController();