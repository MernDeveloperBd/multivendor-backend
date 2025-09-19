const { default: mongoose } = require("mongoose");

const SellerSchema = new mongoose.Schema({
    sellerName:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true,
        unique: true
    },
    email:{
         type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    }
})