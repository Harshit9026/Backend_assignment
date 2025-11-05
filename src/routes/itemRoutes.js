const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemsByCategory,
  getItemsBySubcategory,
  getItemByIdOrName,
  searchItemsByName,
  updateItem
} = require('../controllers/itemController');

router.post('/', createItem);
router.get('/', getAllItems);
router.get('/search', searchItemsByName);
router.get('/category/:categoryId', getItemsByCategory);
router.get('/subcategory/:subcategoryId', getItemsBySubcategory);
router.get('/:identifier', getItemByIdOrName);
router.put('/:id', updateItem);

module.exports = router;
