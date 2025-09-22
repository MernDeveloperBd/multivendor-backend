const axios = require("axios");

const { baseURL, appKey, username, password, getToken } = require("../Config/bkashClient");
const Payment = require("../modal/Payment");

// Create new payment request

async function createPayment(amount, invoice) {
  const token = await getToken();

  const res = await axios.post(`${baseURL}/create`, {
    amount: String(amount),
    currency: "BDT",
    intent: "sale",
    merchantInvoiceNumber: invoice
  },{
    headers: {
      authorization: token,
      username,
      password,
      app_key: appKey,
      "Content-Type": "application/json"
    }
  });

  return res.data; // contains paymentID
}

// Execute payment
async function executePayment(paymentID) {
  const token = await getToken();

  const res = await axios.post(`${baseURL}/execute/${paymentID}`, {}, {
    headers: {
      authorization: token,
      username,
      password,
      app_key: appKey,
      "Content-Type": "application/json"
    }
  });

  const trxData = res.data;

  // save trx in DB
  const payment = new Payment({
    trxID: trxData.trxID,
    paymentID: paymentID,
    amount: trxData.amount,
    status: trxData.transactionStatus,
    currency: trxData.currency,
    invoice: trxData.merchantInvoiceNumber,
    response: trxData
  });

  await payment.save();

  return trxData;
}

// Query trxID status
async function queryTransaction(paymentID) {
  const token = await getToken();

  const res = await axios.get(`${baseURL}/payment/status/${paymentID}`, {
    headers: {
      authorization: token,
      username,
      password,
      app_key: appKey
    }
  });

  return res.data; // contains trxID, transactionStatus etc.
}

// Manual check by trxID
async function findByTrxID(trxID) {
  const payment = await Payment.findOne({ trxID });
  if (!payment) throw new Error("Transaction not found in DB");
  return payment;
}

module.exports = { createPayment, executePayment, queryTransaction, findByTrxID };