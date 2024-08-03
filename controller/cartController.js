const express = require('express');
const Cart = require('../models/cartModel');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const session = require("express-session");
const Product = require('../models/productModel');

const addToCart = asyncHandler(async(req,res) => {
        const { user_id, product_id, quantity } = req.body;
        try {
          if (!user_id || !product_id || quantity === undefined) {
            return res.status(400).send('Missing required fields');
          }

          const quantityToAdd = Number(quantity);

          const product = await Product.findById(product_id);
          if (!product) {
            return res.status(404).send('Product not found');
          }
      
          // Check if the requested quantity exceeds available stock
          if (quantityToAdd > product.stock) {
            return res.status(400).send('Requested quantity exceeds available stock');
          }


          // Check if the item already exists
          let cartItem = await Cart.findOne({ user_id, product_id });
          console.log(cartItem);
          if (cartItem) {
            // Update existing item
            // cartItem.quantity += quantity;
            const newQuantity = cartItem.quantity + quantityToAdd;
            console.log(newQuantity);

            if(newQuantity > product.stock){
                return res.status(400).send('Requested quantity exceeds available stock');
            }else{
                cartItem.quantity = newQuantity;
            }
          } else {
            // Create a new cart item
            cartItem = new Cart({ user_id, product_id, quantity:quantityToAdd });
          }
      
          await cartItem.save();
          res.status(200).send('Item added to cart');
        } catch (error) {
          console.error('Error adding item to cart:', error);
          res.status(500).send('Error adding item to cart');
        }
      });
      

const getCartDetails = asyncHandler(async (req,res) => {
    try {
        const cartItems = await Cart.find({ user_id: req.session.user.id }).populate('product_id');
        res.json(cartItems);
      } catch (error) {
        res.status(500).send('Error fetching cart items');
      }
})

const updateCart = asyncHandler(async(req,res) => {
    try {
        await Cart.findByIdAndUpdate(req.params.id, req.body);
        res.send('Cart item updated');
      } catch (error) {
        res.status(500).send('Error updating cart item');
      }
})

const deleteCart = asyncHandler(async(req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.send('Cart item removed');
      } catch (error) {
        res.status(500).send('Error removing cart item');
      }
})


module.exports = {
    getCartDetails,addToCart,updateCart,deleteCart
};
