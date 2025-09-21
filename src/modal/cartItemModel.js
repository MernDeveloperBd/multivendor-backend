const { default: mongoose } = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref:"Cart", required:true },
  product: { type: mongoose.Schema.Types.ObjectId, ref:"Product", required:true },

  size: { type:String },
  quantity: { type:Number, required:true, default:1 },

  // price fields copy from Product at the time of adding
  price: { type:Number, required:true },        // quantity * product.price
  oldPrice: { type:Number },                    // quantity * product.oldPrice
  reSellingPrice: { type:Number },              // quantity * product.reSellingPrice (optional)
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref:"User", required:true }
});

module.exports = mongoose.model("CartItem", cartItemSchema);