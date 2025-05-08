const router = require('express').Router();

const msgController = require('../controllers/message');

router.post('/', msgController.SEND);
router.get('/:userId', msgController.USER_MESSAGES);

module.exports = router;