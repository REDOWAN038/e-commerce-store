const express = require("express")
const createError = require('http-errors')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const { errorResponse } = require("../handler/responseHandler")

const app = express()

const userRoutes = require("../routes/userRoutes")


// middlewares
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/api/v1/users", userRoutes)


app.get("/test", (req, res) => {
    res.status(200).json({
        message: "welcome to the server"
    })
})

// handling client error
app.use((req, res, next) => {
    createError(404, "route not found")
    next()
})

// handling server error
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
})

module.exports = app