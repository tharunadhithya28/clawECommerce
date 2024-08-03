const express = require('express');
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/', isAdmin, createProduct);
router.get('/', getProduct);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

module.exports = router;
