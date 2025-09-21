const ProductService = require("../service/ProductService.js");

class SellerProductController {
    async getProductsBySellerId(req, res) {
        try {
            const seller = await req.seller;
            const products = await ProductService.getProductsBySellerId(seller._id);
            return res.status(200).json(products)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }; 
    // create product
    async createProduct(req, res) {
        try {
            const seller = await req.seller; 
            const product = await ProductService.createProduct(req.body, seller)
            return res.status(201).json(product)

        } catch (error) {

            res.status(404).json({ error: error.message })
        }

    }

    // delete product
    async deleteProduct(req, res) {
        try {
            await ProductService.deleteProduct(req.params.productId);
            return res.status(200).json({ message: "Product deleted successfully" })
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // update product
    async updateProduct(req, res) {
        try {
            const product = await ProductService.updateProduct(
                req.params.productId,
                req.body
            );
            return res.status(200).json(product)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // Get product by id
    async getProductByID(req, res) {
        try {
            const product = await ProductService.findProductById(
                req.params.productId
            );
            return res.status(200).json(product)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // Search for products by query
    async searchProduct(req, res) {
        try {
            const query = req.query.q;
            const products = await ProductService.searchProduct(query)
            return res.status(200).json(products)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    //get all products
    async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts(req.query);
            return res.status(200).json(products)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

}

module.exports = new SellerProductController()


