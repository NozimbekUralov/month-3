const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/all', userController.ALL);
router.get('/me', userController.GET_ME);

module.exports = router