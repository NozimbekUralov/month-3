const router = require('express').Router();

const authController = require('../controllers/auth');
const { fileInterceptor } = require('../middlewares');

router.post('/register', fileInterceptor, authController.REGISTER);
router.post('/login', authController.LOGIN);

module.exports = router;