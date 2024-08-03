const express = require('express');
const { makePayment } = require('../controller/paymentController');
const router = express.Router();

router.post('/',makePayment);

module.exports = router;
