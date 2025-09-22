const { default: mongoose } = require("mongoose");
const HomeCategorySection = require("../domain/HomeCategorySection.js");

const homeCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    categoryId:{
        type: String,
        required: true
    },
    section:{
        type: String,
        enum:Object.values(HomeCategorySection),
        required: true
    }
},{
    timestamps:true
})
const HomeCategory = mongoose.model("HomeCategory", homeCategorySchema)
module.exports = HomeCategory ;