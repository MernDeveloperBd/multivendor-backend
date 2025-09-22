const TransactionService = require("../service/TransactionService.js");

class TransactionController {
    async getTransactionBySeller(req, res) {
        try {
            const seller = await req.seller;
            const transactoins = await TransactionService.getTransactionBySellerId(seller._id);
            return res.status(200).json(transactoins)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new TransactionController();