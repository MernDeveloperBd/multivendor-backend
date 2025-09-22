const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  trxID: { type: String, required: true, unique: true },  // bKash generated
  paymentID: { type: String, required: true },            // bKash paymentID
  amount: { type: Number, required: true },
  status: { type: String, default: "PENDING" },           // PENDING, SUCCESS, FAILED
  currency: { type: String, default: "BDT" },
  invoice: { type: String },
  response: { type: Object },                             // keep full response if needed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);