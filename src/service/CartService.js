const Cart = require("../modal/Cart");
const CartItem = require("../modal/cartItemModel");
const calculateDiscountPercent = require("../util/calculateDiscountPercent.js");

class CartService {
  async findUserCart(user) {
    let cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      cart = new Cart({ user: user._id, cartItems: [] });
      await cart.save();
    }

    const cartItems = await CartItem.find({ cart: cart._id }).populate("product");

    let totalSelling = 0;
    let totalMrp = 0;

    cartItems.forEach((item) => {
      totalSelling += item.price || 0;
      totalMrp += item.oldPrice || 0;
    });

    cart.totalSellingPrice = totalSelling;
    cart.totalMrpPrice = totalMrp;
    cart.totalItem = cartItems.length;
    cart.discount = calculateDiscountPercent(totalSelling, totalMrp);
    cart.cartItems = cartItems;

    await cart.save();
    return cart;
  }

  async addCartItem(user, product, size, quantity) {
    const cart = await this.findUserCart(user);

    let isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      size
    }).populate("product");

    if (!isPresent) {
      const cartItem = new CartItem({
        product,
        quantity,
        userId: user._id,
        oldPrice: quantity * (product.oldPrice || product.price),
        price: quantity * product.price,
        reSellingPrice: product.reSellingPrice ? quantity * product.reSellingPrice : undefined,
        size,
        cart: cart._id
      });
      await cartItem.save();

      cart.cartItems.push(cartItem._id);
      await cart.save();
      return await cartItem.populate("product");
    }
    return isPresent;
  }
}

module.exports = new CartService();