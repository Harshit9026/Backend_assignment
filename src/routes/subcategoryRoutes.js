const express = require('express');
const router = express.Router();
const {
  createSubcategory,
  getAllSubcategories,
  getSubcategoriesByCategory,
  getSubcategoryByIdOrName,
  updateSubcategory
} = require('../controllers/subcategoryController');

router.post('/', createSubcategory);
router.get('/', getAllSubcategories);
router.get('/category/:categoryId', getSubcategoriesByCategory);
router.get('/:identifier', getSubcategoryByIdOrName);
router.put('/:id', updateSubcategory);

module.exports = router;
