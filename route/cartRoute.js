const express = require('express');
const { addToCart, getCartDetails, updateCart, deleteCart } = require('../controller/cartController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/',isAuthenticated, addToCart);
router.get('/',isAuthenticated, getCartDetails);
router.put('/:id',updateCart);
router.delete('/:id', deleteCart);

module.exports = router;
