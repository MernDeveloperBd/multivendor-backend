const calculateDiscountPercent = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= 0) return 0;
  const discount = oldPrice - price;
  return Math.round((discount / oldPrice) * 100);
};
module.exports = calculateDiscountPercent;