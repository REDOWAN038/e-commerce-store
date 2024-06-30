const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    isAdmin: {
        type: Boolean,
        required: [true, "isAdmin is required"],
        default: false
    },
}, { timestamps: true })


module.exports = mongoose.model("User", userSchema)