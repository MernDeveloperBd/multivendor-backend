const { default: mongoose } = require("mongoose");
const Address = require("../modal/Address");
const OrderItem = require("../modal/OrderItemModel");
const Order = require("../modal/OrderModel");
const User = require("../modal/UserModal");
const OrderStatus = require("../domain/OrderStatus");

class OrderService {
    async createOrder(user, shippingAddress, cart) {
        if (shippingAddress._id && !user.address.includes(shippingAddress._id)) {
            user.address.push(shippingAddress._id);
            await User.findByIdAndUpdate(user._id, user)
        }

        if (!shippingAddress._id) {
            shippingAddress = await Address.create(shippingAddress)
        }


        const itemsBySeller = cart.cartItems.reduce((acc, item) => {
            const sellerId = item.product.seller._id.toString()
            acc[sellerId] = acc[sellerId] || [];
            acc[sellerId].push(item);
            return acc;
        }, {})

        const orders = new Set()

        for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
            const totalOrderPrice = cartItems.reduce((sum, item) => sum + item.sellingPrice)
            const totalItem = cartItems.length;
            console.log("ldlfsdf", totalOrderPrice);

            const newOrder = new Order({
                user: user._id,
                seller: sellerId,
                shippingAddress: shippingAddress._id,
                orderItems: [],
                totalMrpPrice: 1000,
                totalSellingPrice: 1000,
                totalItem: totalItem
            })

            const orderItems = await Promise.all(
                cartItems.map(async (cartItem) => {
                    const orderItem = new OrderItem({
                        product: cartItem.product_id,
                        quantity: cartItem.quantity,
                        oldPrice: cartItem.oldPrice,
                        price: cartItem.price,
                        size: cartItem.size,
                        userId: cartItem.userId

                    })
                    const savedOrderItem = await orderItem.save()
                    newOrder.OrderItems.push(savedOrderItem._id)
                    return savedOrderItem;

                })
            )
            const savedOrder = await newOrder.save()
            orders.add(savedOrder)
        }
        return Array.from(orders)
    }

    // find order by id
    async findOrderById(orderId) {
        if (!mongoose.Types.ObjectId.isValid(orderId)
        ) {
            throw new Error("Invalid Order id")
        }

        const order = await Order.findById(orderId).populate([
            { path: "seller" },
            { path: "OrderItems", populate: { path: "product" } },
            { path: "shippingAddress" }
        ])
        if (!order) {
            throw new Error("Order not found")
        }
        return order;
    }

    // users order history
    async usersOrderHistory(userId) {
        return await Order.find({ user: userId }).populate([
            { path: "seller" },
            { path: "OrderItems", populate: { path: "product" } },
            { path: "shippingAddress" }
        ])
    }

    // Sellers order history
    async getSellersOrder(sellerId) {
        return await Order.find({ seller: sellerId })
            .sort({ orderDate: -1 })
            .populate([
                { path: "seller" },
                { path: "OrderItems", populate: { path: "product" } },
                { path: "shippingAddress" }
            ])
    }

    // update order status
    async updateOrderStatus(orderId, status) {
        if (!mongoose.Types.ObjectId.isValid(orderId)
        ) {
            throw new Error("Invalid Order ID");
        }
        const order = await this.findOrderById(orderId);

        order.status = status;

        return await Order.findByIdAndUpdate(orderId, order, { new: true }).
            populate([
                { path: "seller" },
                { path: "OrderItems", populate: { path: "product" } },
                { path: "shippingAddress" }
            ])
    }

    // Cancel order status
  async cancelOrder(orderId) {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error("Invalid Order ID");
  }

  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  // যদি order.orderItems থাকে, সেগুলোও delete করতে চাইলে:
  await OrderItem.deleteMany({ _id: { $in: order.orderItems } });

  // তারপর অর্ডার মুছে ফেলো
  await Order.findByIdAndDelete(orderId);

  return { message: "Order deleted successfully" };
}

    //order item by id
    async findOrderItemById(orderItemId) {
        if (!mongoose.Types.ObjectId.isValid(orderItemId)
        ) {
            throw new Error("Invalid Order Item ID");
        }
        const orderItem = await OrderItem.findById(orderItemId).populate("product");

        if (!orderItem) {
            throw new Error("Order Item not found");
        }
        return orderItem;
    }
}

module.exports = new OrderService()