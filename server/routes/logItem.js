const express = require('express');
const router = express.Router();
const logItem = require('../controllers/logItem');

router.get('/', logItem.getAllLogItem);
router.get('/:id', logItem.getOneLogItem);
router.post('/', logItem.createLogItem);
router.put('/:id', logItem.updateLogItem);
router.delete('/:id', logItem.deleteLogItem);

module.exports = router;