const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const router = express.Router();



const createProduct = asyncHandler(async(req,res) => {

    const { name,description,price,stock } = req.body;

    //   Validation
    if (!name || !stock || !price || !description) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    const product = await Product.create({
        name,
        price,
        description,
        stock
      });
      res.status(201).json(product);
   
})

const getProduct = asyncHandler(async(req,res) => {
    try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        res.status(500)
        throw new Error("Error fetching Products");
      }
})

const updateProduct = asyncHandler(async (req,res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.send('Product updated');
      } catch (error) {
        res.status(500);
        throw new Error("Error updating product");
      }
})

const deleteProduct = asyncHandler(async(req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send('Product deleted');
      } catch (error) {
        res.status(500);
        throw new Error('Error deleting product')
      }
})



module.exports = {
    createProduct, getProduct,updateProduct,deleteProduct
};
