const Order = require("../modal/OrderModel.js");
const Seller = require("../modal/Seller.js");
const Transaction = require("../modal/TransactionModel.js");

class TransactionService {
    async createTransaction(orderId) {
        const order = await Order.findById(orderId).populate("seller");
        if(!order){
            throw new Error("Order not found")
        }
        const seller = await Seller.findById(order?.seller?._id);
         if(!seller){
            throw new Error("Seller not found")
        }
        //create a new transaction
        const transaction = new Transaction({
            seller:seller?._id,
            customer: order?.user,
            order:order?._id
        })
        return await transaction.save()
    }

    //get transaction by seller id
    async getTransactionBySellerId(sellerId){
            return await Transaction.find({seller: sellerId}).populate('order')
    }
    //get all transaction 
    async getAllTransactions(){
            return await Transaction.find().populate('seller order customer')
    }
}

module.exports = new TransactionService();