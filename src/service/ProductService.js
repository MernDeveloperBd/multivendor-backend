const Category = require("../modal/CategoryModel.js");
const Product = require("../modal/ProductModel.js");
const calculateDiscoutnPercent = require("../util/calculateDiscountPercent.js");


// create product
class ProductService {
     async createProduct(data, seller) {       
        console.log("data", data,'seller', seller);
        
    try {
      const discountPercent = calculateDiscoutnPercent(
        data.price,
        data.oldPrice
      );

      const category1 = await this.createOrGetCategory(data.category, 1);
      const category2 = await this.createOrGetCategory(data.category2, 2, category1._id);
      const category3 = await this.createOrGetCategory(data.category3, 3, category2._id);

      const product = new Product({
        title: data.title,
        description: data.description,
        price: data.price,
        oldPrice: data.oldPrice,
        reSellingPrice: data.reSellingPrice,
        images: data.images,
        quantity: data.quantity,
        color: data.color,
        size: data.size,
        sku: data.sku,
        whatsApp: data.whatsApp,
        shopName: data.shopName,
        facebookURL: data.facebookURL,
        discountPercent,  
        seller: seller._id,
        category: category3._id,
      });

      return await product.save();
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

    // create or get category
    async createOrGetCategory(categoryId, level, parentId = null) {        
        let category = await Category.findOne({ categoryId })     
        
        if (!category) {
            category = new Category({
                categoryId,
                level,
                parentCategory: parentId
            });
            category = await category.save()
        }
        return category;
    }

    // Delete Product
    async deleteProduct(productId) {
        try {
            await Product.findByIdAndDelete(productId)
            return "Product deleted successfully";

        } catch (error) {
            throw new Error(error.message)
        }
    }

    // update product
    async updateProduct(productId, updateProductData) {
        try {
            const product = await Product.findByIdAndUpdate(productId, updateProductData, {
                new: true
            })
            return product;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    //product find by id 
    async findProductById(productId) {
        try {
            const product = await Product.findById(productId)
            if (!product) {
                throw new Error("Product not found")
            }
            return product;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // search product
    async searchProduct(query) {
        try {
            const products = await Product.find({ title: new RegExp(query, "i") });
            return products;
        } catch (error) {
            throw new Error(error.message)
        }
    };

    // get product by seller id
    async getProductsBySellerId(sellerId) {
        return await Product.find({ seller: sellerId })
    }

    //get all products
    async getAllProducts(req) {
        const filterQuery = {};
        if (req.category) {
            const category = await Category.findOne({ categoryId: req.category })
            if (!category) {
                return {
                    content: [],
                    totalPages: 0,
                    totalElement: 0
                }
            }
            filterQuery.category = category._id.toString();
        }
        if (req.color) {
            filterQuery.color = req.color;
        }
        if (req.minPrice && req.maxPrice) {
            filterQuery.sellerId = { $gte: req.minPrice, $lte: req.maxPrice };
        }
        if (req.minDiscount) {
            filterQuery.discoountPercent = { $gte: req.minDiscount }
        }
        if(req.size){
            filterQuery.size=req.size;
        }

        let sortQuery={}
        if(req.sort === "price_low"){
            sortQuery.sellingPrice=1;
        }else if(req.sort === "price_high"){
            sortQuery.sellingPrice= -1;
        }

        const products = await Product.find(filterQuery)
        .sort(sortQuery)
        .skip(req.pageNumber*20)
        .limit(20)

        const totalElement = await Product.countDocuments(filterQuery);
        const totalPages = Math.ceil(totalElement/20);

        const res = {
            content: products,
            totalPages:totalPages,
            totalElement:totalElement
        }
        return res;
    }
}

module.exports = new ProductService()