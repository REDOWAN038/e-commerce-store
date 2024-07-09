const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            name: { type: String, required: true },
            orderQuantity: { type: Number, required: true },
            // image: { type: String, required: true },
            images: [
                {
                    type: String,
                    required: true
                }
            ],
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
        },
    ],

    shippingAddress: {
        address: { type: String, required: true },
        division: { type: String, required: true },
        district: { type: String, required: true },
        country: { type: String, required: true },
    },

    paymentMethod: {
        type: String,
        required: true,
    },

    paymentResult: {
        id: { type: String },
        status: { type: String },
        updateTime: { type: String },
        emailAddress: { type: String },
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },

    paidAt: {
        type: Date,
    },

    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },

    deliveredAt: {
        type: Date,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema)