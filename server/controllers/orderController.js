const createError = require("http-errors")

const productModel = require("../models/productModel")
const orderModel = require("../models/orderModel")
const asyncHandler = require("../handler/asyncHandler")
const { successResponse } = require("../handler/responseHandler")
const { calculateOrderPrices } = require("../handler/calculateOrderPrice")

// place order
const handlePlaceOrder = asyncHandler(async (req, res, next) => {
    const { orderItems, phone, shippingAddress, paymentMethod } = req.body

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
        paymentMethod,
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
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
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

// mark order paid
const handleMarkOrderAsPaid = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const order = await orderModel.findById(id).populate("user")

    if (!order || order.length === 0) {
        return next(createError(404, "order not found"))
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        updateTime: req.body.updateTime,
        emailAddress: req.body.payer.emailAddress,
    };

    const updatedOrder = await order.save();

    return successResponse(res, {
        statusCode: 200,
        message: "order marked paid successfully",
        payload: {
            updatedOrder
        }
    })
})

// mark order deliverd
const handleMarkOrderAsDelivered = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const order = await orderModel.findById(id).populate("user")

    if (!order || order.length === 0) {
        return next(createError(404, "order not found"))
    }

    if (!order.isPaid) {
        return next(createError(406, "payment is not done yet"))
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
    handleMarkOrderAsDelivered
}