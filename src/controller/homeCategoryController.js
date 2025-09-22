const HomeCategoryService = require("../service/HomeCategoryService.js");
const HomeService = require("../service/HomeService.js");

class HomeCategoryController{
    async createHomeCategories(req, res){
        try {
            const homeCategories = req.body;
            const categories = await HomeCategoryService.createCategories(homeCategories);
            const home = await HomeService.createHomePageData(categories)
            return res.status(202).json(home)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    //get all home categories
    async getHomeCategory(req, res){
        try {
            const categories = await HomeCategoryService.getAllHomeCategories();
            return res.status(200).json(categories)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    //update home category
    async updateHomeCategory(req, res){
        try {
            const id = req.params.id;
            const homeCategory = req.body;
            const updateCategory = await HomeCategoryService.updateHomeCategory(
                homeCategory, id);
            return res.status(200).json(updateCategory)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new HomeCategoryController();