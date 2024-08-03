const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: 
  { 
    type: String, 
    required: [true,"Please add a name" ],
},
  description: 
  { 
    type: String, 
    required: [true,"Please add description"],
},
  price: 
  { 
    type: Number, 
    required: [true,"Please add price"], 
},
  stock: 
  { 
    type: Number, 
    required: [true,"Please add stock"], 
}
});

// module.exports = mongoose.model('Product', productSchema);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
