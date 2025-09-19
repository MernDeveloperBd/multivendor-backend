const Address = require("../modal/Address");
const Seller = require("../modal/Seller");
const jwtProvider = require("../util/jwtProvider");

class SellerService{
    async createSeller(sellerData){
        const exitingSeller = await Seller.findOne({email:sellerData.email})
        if(exitingSeller){
            throw new Error("Email already resistered")
        }
        let saveAddress = sellerData.pickUpAddress;

        saveAddress = await Address.create(sellerData.pickUpAddress)

        const newSeller = new Seller({
            sellerName:sellerData.name,
            mobile:sellerData.mobile,
            email:sellerData.email,
            password:sellerData.password,
            pickUpAddress:saveAddress._id,
            GSTIN:sellerData.GSTIN,
            businessDetails:sellerData.businessDetails,
            bankDetails:sellerData.bankDetails,
        })
        return await newSeller.save()
    }

    async getSellerProfile(jwt){
        const email = jwtProvider.getEmailFromjwt(jwt)
        return this.getSellerByEmail(email)
    }

    async getSellerByEmail(email){
        const seller = await Seller.findOne({email})
        if(!seller){
            throw new Error("Seller not found")
        }
        return seller;
    }

    async getSellerById(id){
        const seller = await Seller.findById(id);
        if(!seller){
            throw new Error("Seller not found")
        }
         return seller;
    }
    async getAllSellers(status){
        return await Seller.find({accountStatus:status})
    }
    async updateSeller(exitingSeller, sellerData){
        return await Seller.findByIdAndUpdate(exitingSeller._id, sellerData, {
            new: true
        })
    }
    async updateSellerStatus(sellerId, status){
        return await Seller.findByIdAndUpdate(sellerId, 
            {$set:{accountStatus:status}}, {
                new:true
            })
    }
    async deleteSeller(sellerId){
        return await Seller.findByIdAndDelete(sellerId)
    }
}

module.exports = new SellerService();