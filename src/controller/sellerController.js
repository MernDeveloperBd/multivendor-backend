const sellerService = require("../service/sellerService")

class SellerController {
    async getSellerProfile(req, res) {
        try {
            const jwt = req.headers.authorization.split(" ")[1]
            const seller = await sellerService.getSellerProfile(jwt)
            res.status(200).json(seller)
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({ message: error.message })
        }
    }

     async createSeller(req, res) {
        try {
            const seller = await sellerService.createSeller(req.body)
            res.status(200).json({message:"Seller created successfully"})
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({ message: error.message })
        }
    }

     async getAllSellers(req, res) {
        try {
            const status = req.query.status
            const sellers = await sellerService.getAllSellers(status)
            res.status(200).json(sellers)
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({ message: error.message })
        }
    }

     async updateSeller(req, res) {
        try {
            const existingSeller =await req.seller
            const seller = await sellerService.updateSeller(existingSeller, req.body)
            res.status(200).json(seller)
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({ message: error.message })
        }
    }

     async deleteSeller(req, res) {
        try {
            await sellerService.deleteSeller(req.params.id)
            res.status(200).json({message: 'Seller deleted...'})
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({ message: error.message })
        }
    }

    async updateSellerAccountStatus(req, res){
        
    }
}