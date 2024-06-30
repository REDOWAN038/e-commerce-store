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

// get user
const handleGetUser = async (req, res, next) => {
    try {
        const userId = req.user._id
        const options = { password: 0 }
        const user = await userModel.findById(userId, options)

        if (!user) {
            return next(createError(404, "user does not exist"))
        }

        return successResponse(res, {
            statusCode: 200,
            message: "user returned successfully",
            payload: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

// get all users
const handleGetAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({})
        return successResponse(res, {
            statusCode: 200,
            message: "users returned successfully",
            payload: {
                users,
            }
        })
    } catch (error) {
        next(error)
    }
}

// update user
const handleUpdateUser = async (req, res, next) => {
    try {
        const userId = req.user._id

        const user = await userModel.findById(userId)
        if (!user) {
            return next(createError(404, "user not found"))
        }

        const updateOptions = { new: true, runValidators: true, context: 'query' }
        let updates = {}
        const allowedFields = ['name', 'password']

        for (let key in req.body) {
            if (allowedFields.includes(key)) {
                updates[key] = req.body[key]
            } else if (['email'].includes(key)) {
                return next(new Error("email can not be updated"))
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updates,
            updateOptions
        ).select("-password")

        if (!updatedUser) {
            return next(createError(404, "user with this id does not exist."))
        }

        return successResponse(res, {
            statusCode: 200,
            message: 'user updated successfully',
            payload: {
                updatedUser
            }
        })
    } catch (error) {
        next(error)
    }
}

// get user by id
const handleGetUserById = async (req, res, next) => {
    try {
        const userId = req.params.id
        const options = { password: 0 }
        const user = await userModel.findById(userId, options)

        if (!user) {
            return next(createError(404, "user does not exist"))
        }

        return successResponse(res, {
            statusCode: 200,
            message: "user returned successfully",
            payload: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

// delete user by id
const handleDeleteUserById = async (req, res, next) => {
    try {
        const userId = req.params.id
        const options = { password: 0 }
        const user = await userModel.findById(userId, options)

        if (!user) {
            return next(createError(404, "user does not exist"))
        }

        if (user.isAdmin) {
            return next(createError(403, "Forbidden"))
        }

        await userModel.findByIdAndDelete(userId)

        return successResponse(res, {
            statusCode: 200,
            message: "user deleted successfully",
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleUserRegister,
    handleGetUser,
    handleUpdateUser,
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById
}