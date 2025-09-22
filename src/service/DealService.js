const Deal = require("../modal/DealsModle.js");
const HomeCategory = require("../modal/HomeCategory.js");

class DealService {
    async getDeals() {
        return await Deal.find().populate({ path: 'category' })
    }
    // create deals
    async createDeals(deal) {
        try {
            const category = await HomeCategory.findById(deal?.category?._id);
            const newDeal = new Deal({
                ...deal,
                category: category
            })
            const savedDeal = await newDeal.save();
            return await Deal.findById(savedDeal._id).populate({ path: 'category' })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    //update deal
    async updateDeal(deal, id) {
        const exitingDeal = await HomeCategory.findById(id).populate({
            path: 'category'
        })
        if(exitingDeal){
            return await Deal.findByIdAndUpdate(
                exitingDeal._id,
                {discount:deal?.discount},
                {new: true}
            )
        }
        throw new Error("Deal not found")
    }

    //delete deal
    async deleteDeal(id){
        const deal = await Deal.findById(id);
        if(!deal){
            throw new Error("Deal not found")
        }
        await Deal.deleteOne({_id:id})
    }
}

module.exports = new DealService();