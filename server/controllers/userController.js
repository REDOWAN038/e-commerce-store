const createError = require("http-errors")

const userModel = require("../models/userModel")
const { successResponse } = require("../handler/responseHandler")

// user register
const handleUserRegister = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return next(createError(409, "user already exists by this mail"))
        }

        const newUser = { name, email, password }
        await userModel.create(newUser)

        return successResponse(res, {
            statusCode: 201,
            message: "user registration successful",
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleUserRegister
}