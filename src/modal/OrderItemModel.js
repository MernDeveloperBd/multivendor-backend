const { default: mongoose } = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        // required: true
    },
    size:{
        type:String,

    },
    quantity:{
        type:Number,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    oldPrice:{
        type:Number,
        required: true
    },
},
{
    timestamps:true
})

const OrderItem = mongoose.model("OrderItem", orderItemSchema)
module.exports = OrderItem