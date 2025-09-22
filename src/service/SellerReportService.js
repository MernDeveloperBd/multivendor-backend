const SellerReport = require("../modal/SellerReport.js");

class SellerReportService{
    async getSellerReport(seller){
        try {
            let sellerReport = await SellerReport.findOne({seller: seller?._id})
            console.log("seller report", sellerReport);

            if(!sellerReport){
                sellerReport = new SellerReport({
                    seller:seller?._id,
                    totalOrders:0,
                    totalEarnings: 0,
                    totalSales: 0
                })
                sellerReport = await sellerReport.save()
            }
            return sellerReport;
            
        } catch (err) {
            throw new Error(`Error fetching seller report ${err.message}`)
        }
    }

    // update seller report
    async updateSellerReport(sellerReport){
        try {
            return await SellerReport.findByIdAndUpdate(
                sellerReport._id,
                sellerReport, 
                {new: true})
        } catch (error) {
            throw new Error(`Error updating seller report ${err.message}`)
        }
    }
}

module.exports = new SellerReportService() ;