const SellerReportService = require("../service/SellerReportService.js");


class SellerReportController {
    async getSellerReport(req, res) {
        try {
            const seller = await req.seller;
            const report = await SellerReportService.getSellerReport(seller._id);
            return res.status(200).json(report)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new SellerReportController();