const HomeCategory = require("../modal/HomeCategory.js");

class HomeCategoryService{
    async getAllHomeCategories(){
        return await HomeCategory.find()
    }
    // create home category
    async createHomeCategory(homeCategory){
        return await HomeCategory.create(homeCategory)
    }
    //create categories
    async createCategories(homeCategories){
        const exitingCategories = await HomeCategory.find();

        if(exitingCategories.length == 0){
            return await HomeCategory.insertMany(homeCategories)
        }
        return exitingCategories;
    }

    //update home category
    async updateHomeCategory(category, id){
        const exitingCategory = await HomeCategory.find(id);

        if(!exitingCategory){
            throw new Error("Category not found")
        }

        return await HomeCategory.findByIdAndUpdate(exitingCategory._id, category, {
            new: true
        })
    }
}

module.exports = new HomeCategoryService()