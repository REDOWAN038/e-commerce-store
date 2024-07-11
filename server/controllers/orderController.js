const createError = require("http-errors")
const mongoose = require('mongoose');
const Stripe = require("stripe")

const productModel = require("../models/productModel")
const orderModel = require("../models/orderModel")
const asyncHandler = require("../handler/asyncHandler")
const { successResponse } = require("../handler/responseHandler")
const { calculateOrderPrices } = require("../handler/calculateOrderPrice");
const { stripeSecretKey } = require("../src/secret");

const stripe = new Stripe(stripeSecretKey)

// place order
const handlePlaceOrder = asyncHandler(async (req, res, next) => {
    const { orderItems, phone, shippingAddress } = req.body

    if (orderItems && orderItems.length === 0) {
        return next(createError(400, "No Order Items"))
    }

    const itemsFromDB = await productModel.find({
        _id: { $in: orderItems.map((x) => x._id) }
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
        const matchingItemFromDB = itemsFromDB.find(
            (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
        );

        if (!matchingItemFromDB) {
            return next(createError(404, `Product not found: ${itemFromClient.name}`))
        }

        return {
            ...itemFromClient,
            product: itemFromClient._id,
            price: matchingItemFromDB.price,
            _id: undefined,
        };
    });


    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calculateOrderPrices(dbOrderItems);


    const order = new orderModel({
        orderItems: dbOrderItems,
        user: req.user._id,
        shippingAddress,
        phone,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    const placedOrder = await order.save();

    return successResponse(res, {
        statusCode: 201,
        message: "order placed successfully",
        payload: {
            placedOrder
        }
    })
})

// get all orders
const handleGetAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await orderModel.find({}).populate("user")
    return successResponse(res, {
        statusCode: 200,
        message: "orders returned successfully",
        payload: {
            orders
        }
    })
})

// get logged in user all orders
const handleGetLoggedUserAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await orderModel.find({ user: req.user._id })
    return successResponse(res, {
        statusCode: 200,
        message: "orders returned successfully",
        payload: {
            orders
        }
    })
})

// get total orders
const handleGetTotalOrders = asyncHandler(async (req, res, next) => {
    const totalOrders = await orderModel.countDocuments()
    return successResponse(res, {
        statusCode: 200,
        message: "total orders returned successfully",
        payload: {
            totalOrders
        }
    })
})

// get total sales
const handleGetTotalSales = asyncHandler(async (req, res, next) => {
    const orders = await orderModel.find();
    const totalSales = orders.reduce((sum, order) => {
        return order.isPaid ? sum + order.totalPrice : sum;
    }, 0);
    return successResponse(res, {
        statusCode: 200,
        message: "total sales returned successfully",
        payload: {
            totalSales
        }
    })
})

// get total sales by dates
const handleGetTotalSalesByDates = asyncHandler(async (req, res, next) => {
    const totalSalesByDate = await orderModel.aggregate([
        {
            $match: {
                isPaid: true,
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
                },
                totalSales: { $sum: "$totalPrice" },
            },
        },
    ]);

    return successResponse(res, {
        statusCode: 200,
        message: "total sales by dates returned successfully",
        payload: {
            totalSalesByDate
        }
    })
})

// get order by id
const handleGetSingleOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const order = await orderModel.findById(id).populate("user")

    if (!order || order.length === 0) {
        return next(createError(404, "order not found"))
    }

    return successResponse(res, {
        statusCode: 200,
        message: "order returned successfully",
        payload: {
            order
        }
    })
})

// order payment intent
const handleOrderPaymentIntent = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const order = await orderModel.findById(id).populate("user");

    if (!order || order.length === 0) {
        return next(createError(404, "Order not found"));
    }

    if (order.user._id.toString() !== req.user._id) {
        return next(createError(403, "Invalid User"));
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: order.totalPrice * 100,
        currency: "usd",
        metadata: {
            orderId: id,
            userId: req.user._id
        },
    });

    if (!paymentIntent.client_secret) {
        return next(new Error("error while creating payment intent..."))
    }

    const paymentIntentId = paymentIntent.id
    const clientSecret = paymentIntent.client_secret.toString()

    return successResponse(res, {
        statusCode: 200,
        message: "payment intent",
        payload: {
            paymentIntentId,
            clientSecret
        }
    })

})

// mark order paid
const handleMarkOrderAsPaid = asyncHandler(async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { id } = req.params;
        const { paymentIntentId } = req.body
        const order = await orderModel.findById(id).populate("user").session(session);

        if (!order || order.length === 0) {
            await session.abortTransaction();
            session.endSession();
            return next(createError(404, "Order not found"));
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (!paymentIntent) {
            return next(createError(404, "payment intent not found"))
        }

        if (
            paymentIntent.metadata.orderId !== id ||
            paymentIntent.metadata.userId !== req.user._id
        ) {
            return next(createError(400, "payment intent mismatch"))
        }

        if (paymentIntent.status !== "succeeded") {
            return next(createError(400, `payment intent not succeeded. Status: ${paymentIntent.status}`))
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentIntentId = paymentIntentId

        for (const item of order.orderItems) {
            const product = await productModel.findById(item.product).session(session);

            if (product) {
                product.quantity -= item.orderQuantity;
                product.sold += item.orderQuantity;

                // Ensure quantity and sold do not go negative
                if (product.quantity < 0) {
                    product.quantity = 0;
                }
                if (product.sold < 0) {
                    product.sold = 0;
                }

                await product.save({ session });
            }
        }

        const updatedOrder = await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        return successResponse(res, {
            statusCode: 200,
            message: "Order marked paid successfully",
            payload: {
                updatedOrder,
            },
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return next(error);
    }
})

// mark order deliverd
const handleMarkOrderAsDelivered = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const order = await orderModel.findById(id).populate("user")

    if (!order || order.length === 0) {
        return next(createError(404, "order not found"))
    }

    if (!order.isPaid) {
        return next(createError(406, "payment is pending"))
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    return successResponse(res, {
        statusCode: 200,
        message: "order marked delivered successfully",
        payload: {
            updatedOrder
        }
    })
})

module.exports = {
    handlePlaceOrder,
    handleGetAllOrders,
    handleGetLoggedUserAllOrders,
    handleGetTotalOrders,
    handleGetTotalSales,
    handleGetTotalSalesByDates,
    handleGetSingleOrder,
    handleMarkOrderAsPaid,
    handleMarkOrderAsDelivered,
    handleOrderPaymentIntent
}