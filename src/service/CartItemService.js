const CartItem = require("../modal/cartItemModel.js");

class CartItemService {
  // update
  async updateCartItem(userId, cartItemId, cartItemData) {
    let cartItem = await CartItem.findById(cartItemId).populate("product");
    if (!cartItem) throw new Error("Cart item not found");

    if (cartItem.userId.toString() === userId.toString()) {
      const updated = {
        quantity: cartItemData.quantity,
        price: cartItemData.quantity * cartItem.product.price,
        oldPrice: cartItem.product.oldPrice
          ? cartItemData.quantity * cartItem.product.oldPrice
          : cartItemData.quantity * cartItem.product.price,
        reSellingPrice: cartItem.product.reSellingPrice
          ? cartItemData.quantity * cartItem.product.reSellingPrice
          : undefined
      };
      return await CartItem.findByIdAndUpdate(cartItemId, updated, { new:true }).populate("product");
    } else {
      throw new Error("Unauthorized access");
    }
  }

  // delete
  async removeCartItem(userId, cartItemId) {
    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) throw new Error("Cart item not found");

    if (cartItem.userId.toString() === userId.toString()) {
      await CartItem.deleteOne({ _id: cartItem._id });
    } else {
      throw new Error("Unauthorized access");
    }
  }

  // find
  async findCartItemById(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (!cartItem) throw new Error("Cart item not found");
    return cartItem;
  }
}

module.exports = new CartItemService();