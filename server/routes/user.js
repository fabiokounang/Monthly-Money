const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/', user.getAllUser);
router.get('/:id', user.getOneUser);
router.post('/', user.createUser);
router.put('/:id', user.updateUser);
router.delete('/:id', user.deleteUser);
router.post('/login', user.loginUser);

module.exports = router;