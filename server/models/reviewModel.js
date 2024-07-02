const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
    },
    rating: {
        type: Number,
        required: [true, "rating is required"],
    },
    comment: {
        type: String,
        required: [true, "comment is required"],
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema)