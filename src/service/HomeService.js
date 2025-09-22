const HomeCategorySection = require("../domain/HomeCategorySection.js");
const DealService = require("./DealService");

class HomeService{
    async createHomePageData(allCategories){

        const gridCategories = allCategories.filter(
            (category) =>category.section === HomeCategorySection.GRID);

        const shopByCategories = allCategories.filter(
            (category) =>category.section === HomeCategorySection.SHOP_BY_CATEGORIES);

        const womenCategories = allCategories.filter(
            (category) =>category.section === HomeCategorySection.WOMEN_CATEGORIES);
        const dealCategories = allCategories.filter(
            (category) =>category.section === HomeCategorySection.DEALS);
        
            const deals = await DealService.getDeals();
            
        const home = {
            grid: gridCategories,
            shopByCategories: shopByCategories,
            womenCategories: womenCategories,
            deals:deals,
            dealCategories:dealCategories
        };
        return home;
    }
}

module.exports = new HomeService();