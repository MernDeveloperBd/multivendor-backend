const { createPayment, executePayment, queryTransaction, findByTrxID } = require("../service/PaymentService");


class PaymentController {
  async initiate(req, res) {
    try {
      const { amount, invoice } = req.body;
      const result = await createPayment(amount, invoice);
      return res.json(result); // will give paymentID
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async execute(req, res) {
    try {
      const { paymentID } = req.body;
      const result = await executePayment(paymentID);
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async queryPayment(req, res) {
    try {
      const { paymentID } = req.body;
      const result = await queryTransaction(paymentID);
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async checkByTrx(req, res) {
    try {
      const { trxID } = req.params;
      const result = await findByTrxID(trxID);
      return res.json(result);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new PaymentController();