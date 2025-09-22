const CartService = require("../service/CartService");
const OrderService = require("../service/OrderService");
// const { createPayment } = require("../service/PaymentService");
// const { createPayment } = require("../service/PaymentService");

class OrderController {
    async createOrder(req, res, next) {
        const { shippingAddress } = req.body;
        try {
            const user = await req.user;
            const cart = await CartService.findUserCart(user);
            const orders = await OrderService.createOrder(user, shippingAddress, cart);

            //
         /*    const paymentOrder = await createPayment(user, orders );
            if(paymentMethod === "Bkash"){
                const payment = await createPayment(user, paymentOrder.amount, paymentOrder._id)
            }
 */
            return res.status(200).json(orders)

        } catch (error) {
            return res.status(500).json({ message: `Error creating order ${error}` })
        }
    }

    // get order by id
    async getOrderById(req, res, next) {
        try {
            const { orderId } = req.params;
            const order = await OrderService.findOrderById(orderId)
            return res.status(200).json(order)
        } catch (error) {
            return res.status(401).json({ error: error.message })
        }
    }
    // get order by Item id
    async getOrderByItemId(req, res, next) {
        try {
            const { orderItemId } = req.params;
            const orderItem = await OrderService.findOrderItemById(orderItemId)
            return res.status(200).json(orderItem)
        } catch (error) {
            return res.status(401).json({ error: error.message })
        }
    }
    // get user order history
    async getUerOrderHistory(req, res) {
        const user = await req.user;
        console.log("req user his", user, user._id)
        try {
            const orderHistory = await OrderService.usersOrderHistory(user._id)
            return res.status(200).json(orderHistory)
        } catch (error) {
            return res.status(401).json({ error: error.message })
        }
    }

    // get  orders for a specific seller
    async getSellersOrder(req, res) {
        try {
            const selerId = req.seller._id;
            const orders = await OrderService.getSellersOrder(selerId)
            return res.status(200).json(orders)
        } catch (error) {
            return res.status(401).json({ error: error.message })
        }
    }

    // Update order status
    async updateOrderStatus(req, res) {
        try {
            const { orderId, orderStatus } = req.params;
            const updateOrder = await OrderService.updateOrderStatus(
                orderId,
                orderStatus
            )
            return res.status(200).json(updateOrder)
        } catch (error) {
            return res.status(401).json({ error: error.message })
        }
    }
    // candel order 
    async cancelOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            const userId = await req.user._id;
            const cancelOrder = await OrderService.cancelOrder(
                orderId,
                userId
            )
            return res.status(200).json({
                message: "order cancel succesfully",
                order: cancelOrder
            })
        } catch (error) {
            return res.status(401).json({ error: error.message })
        }
    }
    // delete order 
    async deleteOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            await OrderService.cancelOrder(
                orderId
            )
            return res.status(200).json({
                message: "order deleted succesfully"
            })
        } catch (error) {
            return res.status(401).json({ error: error.message })
        }
    }

}

module.exports = new OrderController();