const express = require('express');
const router = express.Router();
const log = require('../controllers/log');
const checkAuth = require('../middleware/check-auth');

router.get('/categories/:id', checkAuth, log.getAllTotalLogByCategories);
router.get('/:id', checkAuth, log.getAllLogByUser);
router.post('/', checkAuth, log.postLog);
router.get('/:id/:type', checkAuth, log.getAllTotalByType);

module.exports = router;