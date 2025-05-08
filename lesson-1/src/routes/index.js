const express = require('express');
const fileUpload = require('express-fileupload');

const { jwtAuthGuard, authValidator } = require('../middlewares');

const router = express.Router()

router.use(fileUpload({
    limits: {
        fileSize: 5 * 1024 ** 2
    },
    abortOnLimit: true
}))
router.use(express.json());
router.use(express.static(process.cwd() + '/uploads'))

const messageRouter = require('./message');
const authRouter = require('./auth');
const userRouter = require('./user');

router.use("/auth", authValidator, authRouter);
router.use("/message", jwtAuthGuard, messageRouter);
router.use("/user", jwtAuthGuard, userRouter);

module.exports = router;