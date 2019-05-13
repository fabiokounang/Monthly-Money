const express = require('express');
const router = express.Router();
const category = require('../controllers/category');
const checkAuth = require('../middleware/check-auth');

router.get('/:id', checkAuth, category.getAllCategoryByUser);
router.post('/', checkAuth, category.postCategory);

module.exports = router;