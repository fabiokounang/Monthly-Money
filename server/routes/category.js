const express = require('express');
const router = express.Router();
const category = require('../controllers/category');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, category.getAllCategoryByUser);
router.post('/', checkAuth, category.addCategory);
router.put('/:id', category.editCategory);
router.delete('/:id', category.deleteCategory);

module.exports = router;