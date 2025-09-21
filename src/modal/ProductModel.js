const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
     title:{
        type:String,
        required: true,
        unique:true,
        trim:true
    },
    description:{
        type:String,
        required: true,
        trim:true
    },
     price:{
        type:Number,
        required: true,
    },
     oldPrice:{
        type:Number,
    },
     reSellingPrice:{
        type:Number,
    },
     discountPercent:{
        type:Number
    },
    quantity:{
        type:Number,
        required: true,
    },
     color:{
        type:String,
    },
     sku:{
        type:String,
    },
    
     whatsApp:{
        type:Number,
    },
      shopName:{
        type:String,
    },
     facebookURL:{
        type:String,
    },
    images: {
        type:[String],
        required: true,
    } ,   
     category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category", 
        required: true,       
    }, 
     seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller", 
        required: true,       
    }, 
    size:{
        type:String,
    }     
},{
    timestamps:true
}
)
const Product = mongoose.model("Product", productSchema)
module.exports = Product;