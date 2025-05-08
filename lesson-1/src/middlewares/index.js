const Joi = require('joi');
const { errorHandler, verifyToken, ClientError } = require('../lib/utils')

const jwtAuthGuard = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = verifyToken(token);
        req.user = user;
        next()
    } catch (err) {
        err.status = 401
        errorHandler(err, res);
    }
}

const fileInterceptor = (req, res, next) => {
    try {
        const file = req.files.file;
        const [mime, type] = file.mimetype.split('/');
        if (mime.toLowerCase() != 'image') throw new ClientError('Invalid file type, only images are allowed', 400, null);
        req.filePath = process.cwd() + '/uploads'
        next()
    } catch (err) {
        errorHandler(err, res);
    }
}

const authValidator = async (req, res, next) => {
    try {
        const authSchema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        });
        await authSchema.validateAsync(req.body);
        next()
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    jwtAuthGuard,
    fileInterceptor,
    authValidator
}