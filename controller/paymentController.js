const express = require('express');
const asyncHandler = require('express-async-handler');


const makePayment = asyncHandler(async(req,res) => {
    setTimeout(() => {
        res.send('Payment processed');
      }, 2000);
    });




module.exports = {
    makePayment
};
