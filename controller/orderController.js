const express = require('express');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require('../models/productModel');

const placeOrder = asyncHandler(async (req,res) => {
    try {
        const cartItems = await Cart.find({ user_id: req.session.user.id }).populate('product_id');
        console.log(cartItems);
        
        if (cartItems.length === 0) {
          return res.status(400).send('Cart is empty');
        }
    
        // Calculate total
        const total = cartItems.reduce((sum, item) => {
          const quantity = Number(item.quantity);
          const price = Number(item.product_id.price);
    
          return sum + (quantity * price);
        }, 0);

        const user_id = req.session.user.id;

        const newOrder = new Order({
            user_id: req.session.user.id,
            items: cartItems.map(item => ({
                product_id: item.product_id._id,
                product_name: item.product_id.name,
                product_description: item.product_id.description,
                product_price: item.product_id.price,
                quantity: item.quantity,
              })),
            total,
            status: 'pending'
          });
      
          await newOrder.save();

          for (const item of newOrder.items) {
            const product = await Product.findById(item.product_id);
            if (product) {
              product.stock -= item.quantity;
              await product.save();
            }
          }
      
          // Clear the cart after creating the order
          await Cart.findOneAndDelete({ user_id });
       
    
        res.json({ message: 'Order Placed Successfully', cartItems, total });
      } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching cart items');
      }
})

const getOrders = asyncHandler(async(req,res) => {
    try {
        const orders = await Order.find({ user_id: req.session.user.id });
        res.json(orders);
      } catch (error) {
        res.status(500).send('Error fetching orders');
      }
})


module.exports = {
    placeOrder,getOrders
};
