const errorHandler = (err, res) => {
    const error = {
        status: err.status || 500,
        message: err.message || 'Something went wrong',
        data: null,
    };
    res.status(error.status).json(error);
}

class ResObj {
    constructor(message, status, data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}

class ClientError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status
    }
}

const resHandler = (data = new ResObj(), res) => {
    res.status(data.status).json(data);
}

module.exports = {
    errorHandler,
    resHandler,
    ResObj,
    ClientError,
};