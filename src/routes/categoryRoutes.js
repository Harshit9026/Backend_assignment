const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryByIdOrName,
  updateCategory
} = require('../controllers/categoryController');

router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:identifier', getCategoryByIdOrName);
router.put('/:id', updateCategory);

module.exports = router;
