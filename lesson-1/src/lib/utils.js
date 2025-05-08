const fs = require('node:fs');

const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('./config');


const readDb = async (path) => {
    const store = await fs.promises.readFile(path, "utf-8")
    return store ? JSON.parse(store) : []
}

const writeDb = async (dbPath, data) => {
    await fs.promises.writeFile(dbPath, JSON.stringify(data, null, 4));
    return true;
}

const idProvider = (dbName) => {
    const store = JSON.parse(fs.readFileSync(dbName, "utf-8"));
    return store.length ? store[store.length - 1].id + 1 : 1;
}

const generateToken = (payload) => {
    return jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: jwtExpiresIn }
    )
}

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
}

class ResponseObj {
    constructor(message, status, data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}

const responseHandler = (data = ResponseObj, res) => {
    res.status(data.status).json(data);
}

const errorHandler = (err, res) => {
    const error = {
        message: err.message,
        status: err.status || 500,
        data: err.data || null
    }
    res.status(error.status).json(error);
}

class ClientError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

module.exports = {
    readDb,
    writeDb,
    idProvider,
    ResponseObj,
    errorHandler,
    responseHandler,
    generateToken,
    verifyToken,
    ClientError
}