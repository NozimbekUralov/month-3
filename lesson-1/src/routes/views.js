const router = require('express').Router();

const viewsController = require('../controllers/views');

router.get('/', viewsController.INDEX);
router.get('/register', viewsController.REGISTER);
router.get('/login', viewsController.LOGIN);

module.exports = router