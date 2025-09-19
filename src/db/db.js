const { default: mongoose } = require("mongoose");

const uri ="mongodb+srv://mmfashionuser:7YmygIERjeyplrLm@mmfashioncluster.4mk4che.mongodb.net/MMFASHION_WORLD?retryWrites=true&w=majority&appName=mmfashionCluster";

const connectDB = async()=>{
    try {
        const conn =await mongoose.connect(uri)
        console.log(`Mongoose connected: ${conn.connection.host}`)      
    } catch (error) {
        console.log(`MongoDB error: ${error}`)
        
    }
}
module.exports=connectDB