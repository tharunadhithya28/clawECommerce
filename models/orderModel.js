const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
items: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }],
  total: 
  { 
    type: Number, 
    required: true 
},
  status: 
  { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending', 
}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order; 
